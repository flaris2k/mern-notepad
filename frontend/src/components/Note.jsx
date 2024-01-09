import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { delNote, getNote, getSpesNote } from '../redux/slices/noteSlice';
import { useParams } from 'react-router-dom';

const Note = ({noteTitle,activeTitle,clickFunc,delFunc}) => {
  const userid = useParams();
  const dispatch = useDispatch();
  const [active,setActive] = useState(false);
  
  let activeClass = active ? 'bg-gray-400' : 'bg-gray-300'
  useEffect(()=>{
    setActive(activeTitle === noteTitle);

    console.log('Hello ReactJS')
  },[activeTitle])
  

  
  
  
  return (
    <div onClick={clickFunc} className={`note  ${activeClass} rounded-md flex h-[60px] m-2 items-center px-2 justify-between cursor-pointer duration-200 hover:bg-gray-400`}>
          <div  className="user flex items-center w-[88%]">
            <span className='w-full mx-2 text-xl whitespace-nowrap overflow-hidden text-ellipsis'>{noteTitle}</span>
          </div>
          <div className="delete cursor-pointer duration-200 hover:text-red-500" onClick={delFunc}>
            <FaTrashAlt size={28} />
          </div>


        </div>
  )
}

export default Note