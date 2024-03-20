import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../reducer/userReducer";
import voteReducer from "../reducer/voteReducer";
import votedReducer from "../reducer/votedReducer";

const store =  configureStore({
    reducer:{
        auth: userReducer,
        vote:voteReducer,
        voted:votedReducer,


    }
})


export default store;