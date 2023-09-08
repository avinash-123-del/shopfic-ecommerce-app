import {configureStore} from '@reduxjs/toolkit'
import { userSlice } from './slices/userSlice'


const store = configureStore({
    reducer: {
        user: userSlice.reducer         // user me hi sara data store hoga
    }

})

export default store

