const express = require('express');
const cors = require('cors')
const { connectToDatabase, userModel } = require('./dbConnect')
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const port = 5000;


app.use(cors())

app.use(express.json())

connectToDatabase()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//-----------------------------------------------User Authentication-----------------------------------

// signup **************
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    await bcrypt.hash(password, 10)
        .then(hash => {
            userModel.create({ email, password: hash })
                .then(auth => res.json({ sucess: true, message: 'user registered' }))
                .catch(err => console.log(err))
        })
        .catch(err => console.log("error in auht index", err))

})


// login ***************
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const authUser = await userModel.findOne({ email: email })
    if (authUser) {
        bcrypt.compare(password, authUser.password, (err, passwordMatch) => {
            if (passwordMatch) {
               const token =  jwt.sign({ email: authUser.email }, '78964asdasddada', { expiresIn: '1d' })
                res.cookie('jwtToken', token)
                res.json({ status: 200, message: 'Login successful' });
            } else {
                console.log('password not matched');
                res.json({ status: 501, message: 'Password not matched' });
            }
        })
    }
    else {

        res.send({ message: 'user not found', status: 401 })
        console.log('user not exist');
    }
    console.log("user email", authUser);
})

//logout ******************
app.post('/logout', (req, res) => {
    try {
        res.clearCookie('jwtToken');
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout failed:', error);
        res.status(500).json({ success: false, message: 'Logout failed' });
    }
});


