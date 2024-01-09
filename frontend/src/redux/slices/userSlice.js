import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk('/api/getallusers',async()=>{
    const apiKey = '!1qaz2WSX'
    const response = await fetch('http://localhost:8000/api/user/getall',{
        method:'GET',
        headers:{'Content-Type':'application/json','authorization':`${apiKey}`},
    })
    const respJSON = response.json();
    return respJSON;
})

export const saveUsers = createAsyncThunk('/api/saveusers',async(user_data)=>{
    const apiKey = '!1qaz2WSX'
    const response = await fetch('http://localhost:8000/api/user/save',{
        method:'POST',
        headers:{'Content-Type':'application/json','authorization':`${apiKey}`},
        body:JSON.stringify({
            username:user_data.username,
            password:user_data.password
        })
    })
    const respJSON = response.json();
    return respJSON;
})

const userSlice = createSlice({
    name:'users',
    initialState:{
        users:{

        },
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.users = action.payload;
        })
        .addCase(saveUsers.fulfilled,(state,action)=>{
            state.users = action.payload;
        })
    }
})

export default userSlice