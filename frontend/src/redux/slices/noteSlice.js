import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
const apiKey = '!1qaz2WSX'


export const saveNote = createAsyncThunk('notes/save',async(data)=>{
    const fetchNote = await fetch('http://localhost:8000/api/note/save',{
        method:'POST',
        headers:{'Content-Type':'application/json','authorization':`${apiKey}`},
        body:JSON.stringify({
            userID : data.userID,
            noteT:data.noteT,
            noteC:data.noteC
        })
    })
    const resp = await fetchNote.json();
    return resp;
}) 


export const delNote = createAsyncThunk('user/del',async(data)=>{
    console.log('DATA:',data);
    const fetchNote = await fetch('http://localhost:8000/api/note/del',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'authorization':apiKey
        },
        body:JSON.stringify({
            noteT:data.noteTitle,
            userID:data.uid
        })
    });
    const jsonFetch = await fetchNote.json();
    return jsonFetch;
})

export const getNote = createAsyncThunk('notes/get',async(data)=>{
    console.log('DATA:',data);
    const fetchNote = await fetch('http://localhost:8000/api/note/get?userID='+data,{
        method:'GET',
        headers:{'Content-Type':'application/json','authorization':apiKey}
    });
    const resp = fetchNote.json();
    return resp;
}) 


export const getSpesNote = createAsyncThunk('notes/getNote',async(data)=>{
    console.log('DATA:',data);
    const fetchNote = await fetch(`http://localhost:8000/api/note/snote?userID=${data.uid}&noteTitle=${data.noteT}`,{
        method:'GET',
        headers:{'Content-Type':'application/json','authorization':apiKey}
    });
    const resp = fetchNote.json();
    return resp;
}) 


export const updateNote = createAsyncThunk('notes/updNote',async(data)=>{
    console.log('DATA:',data);
    const fetchNote = await fetch(`http://localhost:8000/api/note/updnote?userID=`+data.id,{
        method:'POST',
        headers:{'Content-Type':'application/json','authorization':apiKey},
        body:JSON.stringify({
            oldTitle:data.oldT,
            newTitle:data.newT,
            newContent:data.newC
        })
    });
    const resp = fetchNote.json();
    return resp;
}) 

const noteSlice = createSlice({
    name:'notes',
    initialState:{
        notes:[],
        active:[]
    },
    reducers:{
        clearActive : (state)=>{
            state.active = [];
            state.notes = state.notes
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(saveNote.fulfilled,(state,action)=>{
            state.notes = action.payload;
        })
        .addCase(getNote.fulfilled,(state,action)=>{
            state.notes = action.payload;
        })
        .addCase(delNote.fulfilled,(state,action)=>{
            state.notes = action.payload;
        })
        .addCase(getSpesNote.fulfilled,(state,action)=>{
            state.active = action.payload
        })
        .addCase(updateNote.fulfilled,(state,action)=>{
            state.notes = action.payload;
        })
    }
})

export const {clearActive} = noteSlice.actions;
export default noteSlice

