import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import { BiSolidExit } from "react-icons/bi";
import { FaSquarePlus } from "react-icons/fa6";

import Note from '../components/Note';
import { clearActive, delNote, getNote, getSpesNote, saveNote, updateNote } from '../redux/slices/noteSlice';

const Notepage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const activeNote = useSelector(state => state.note.active);
  const note = useSelector(state => state.note.notes);
  const [refresher,setRefresher] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [oldTitle,setOldTitle] = useState('');
  const [username,setUsername] = useState('');
  const [error,setError] = useState(false);
  const [errorText,setErrorText] = useState('');

  const delFunc = (e)=>{
    const data ={
      noteTitle:e,
      uid:id
    }
    dispatch(delNote(data));
    cActive();
  }

  useEffect(()=>{
    if(localStorage.getItem('loggedUser')){
      setUsername(localStorage.getItem('loggedUser'));
    }else{
      window.location.href = '/'
    }
  },[localStorage.getItem('loggedUser')])
  useEffect(()=>{
    dispatch(getNote(id));
  },[dispatch,id])

  useEffect(()=>{
    setError(false);
  },[noteTitle,noteContent])
  useEffect(()=>{
    setError(false);
    if(activeNote.length>0){
      setOldTitle(activeNote[0].noteTitle);
      setNoteTitle(activeNote[0].noteTitle)
      setNoteContent(activeNote[0].noteContent)

    }else{
      setNoteTitle('');
      setNoteContent('');
    }
  },[activeNote])
  const saveN = async () => {
    setError(false);
    if (noteTitle.length > 1 && noteContent.length > 1) {
      let canAdd = note.filter(nt => nt.noteTitle == noteTitle);
      if(activeNote.length != 0 && oldTitle == noteTitle) canAdd = 0;
      if(canAdd.length >0){
        setError(true);
        setErrorText('Aynı isimde birden fazla not bulunamaz!');
      }else{
        if(activeNote.length >0){
          const updateData = {
            id:id,
            oldT : oldTitle,
            newT : noteTitle,
            newC : noteContent
          }
          dispatch(updateNote(updateData));
          cActive();
          setNoteTitle('');
          setNoteContent('');
        }else{
          const data = {
            userID: id,
            noteT: noteTitle,
            noteC: noteContent
          }
          try {
            dispatch(saveNote(data));
            cActive()
          } catch (error) {
            console.error(error);
          }
        }
        

      }
      
    } else {
      setError(true);
      setErrorText('Not Başlığı veya içeriği boş bırakılamaz!');
    }
  }

  const cActive = ()=>{
    dispatch(clearActive());
    setOldTitle('');
  }

  useEffect(() => {
    dispatch(getNote(id));
  }, [refresher, dispatch, id]);

  const getSnote = (e)=>{
    const data = {
      uid:id,
      noteT:e
    }
    dispatch(getSpesNote(data));

  }


  const logout = ()=>{
    localStorage.setItem('loggedUser','');
    window.location.href = '/'
  }

  return (
    <div id='notepad' className='w-screen bg-no-repeat bg-cover bg-center h-screen overflow-hidden bg-gif flex box-border gap-4 py-4 px-4'>
      {
        error &&       <div className="absolute p-2 bg-red-500 text-white text-center right-0 left-0 bottom-0">{errorText}</div>

      }
      <div className="w-full h-full bg-white rounded-md overflow-y-scroll">
        <div className=" bg-gray-300 rounded-md flex h-[60px] m-2 items-center px-2 justify-between">
          <div className="user flex items-center">
            <FaUserCircle size={28} />
            <span className='mx-2 text-xl'>{username}</span>
          </div>

          <span className='flex items-center'>
          <div className="add cursor-pointer duration-200 hover:text-green-500">
            <FaSquarePlus onClick={()=>{cActive()}} size={28} />
          </div>

          <div className="exit cursor-pointer duration-200 hover:text-red-500">
            <BiSolidExit onClick={()=>{logout()}} size={32} />
          </div>
          </span>
        </div>

        
        
{
  note?.map((nt, key) => (
    <div key={key} className="nt">
      <Note noteTitle={nt.noteTitle} activeTitle={oldTitle} clickFunc = {()=>getSnote(nt.noteTitle)} delFunc={()=>{delFunc(nt.noteTitle)}}/>
    </div>
  ))
}
      </div>

      <div className="w-full h-full bg-white ">
        <div className="rounded-md bg-gray-200 border-2 border-gray-300 m-2 flex">
          <input tabIndex={1} maxLength={40} value={noteTitle} onChange={(e)=>{setNoteTitle(e.target.value)}} placeholder='Not Başlığı' className='w-full bg-transparent  p-1  outline-none' type="text" />
          <button tabIndex={3} onClick={()=>{saveN()}} className='py-2 px-4 bg-green-400 text-white font-bold rounded-md'>Save</button>
        </div>

        <div className="rounded-md bg-gray-200 border-2 border-gray-300 m-2">
          <textarea tabIndex={2} value={noteContent} onChange={(e)=>{setNoteContent(e.target.value)}} placeholder='Not İçeriği' name="" id="" className='w-full h-full rounded-md outline-none bg-transparent p-1' cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>
  )
}

export default Notepage