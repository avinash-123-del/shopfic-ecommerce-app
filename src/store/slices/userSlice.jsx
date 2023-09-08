import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",

    initialState: [],    //to store data

    reducers: {
        addItem(state, action) {
            state.push(action.payload)   //jo bhi action hua hoga usko push krdena
            console.log("state",...state);
            console.log("state length",state.length);
        },
        removeItem(state, action) {
            state.splice(action.payload, 1) //(datafromUser , no. of data to del)
        },
       
    },
  
})

console.log("use slice name", userSlice.actions);

//export {userSlice}      //export slice

export const { addItem, removeItem } = userSlice.actions;
// destructure the reducers and export by userSlice.actions
//export action creaters also