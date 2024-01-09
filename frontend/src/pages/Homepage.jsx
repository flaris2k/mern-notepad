import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, saveUsers } from '../redux/slices/userSlice';

const Homepage = () => {
    const dispatch = useDispatch();
    const users = useSelector(state=>state);
    const [loginMode,setLoginMode] = useState(true);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(false);
    const [repPassword,setRepPassword] = useState('');
    console.log(users.user.users)

    function loginHandler(e){
        e.preventDefault();
        
        if(users){
            try {
                let authorization;
                if(users.user.users.length > 1){
                    authorization = users.user.users.filter((us)=> us.user === username)[0];
                }else{
                    authorization = users.user.users[0];
                }
                if(authorization && authorization.password == password){
                    window.location.href = `/notepad/${authorization._id}`
                    console.log('Authorized!');
                    localStorage.setItem('loggedUser',authorization.user);
                }else{
                    setUsername('');
                    setPassword('');
                    console.log('Not Authorized!');
                }
            } catch (error) {
                console.log(error);
            }
        }
        
    }

    function registerHandler(e,user,pass,repPass){
        
        e.preventDefault();
        const userdata = {
            username:user,
            password:pass
        }
        if(pass === repPass){
            dispatch(saveUsers(userdata));
            setUsername('');
            setPassword('');
            console.log('Saved!');
            setLoginMode(true);
        }
        setUsername('');
        setPassword('');
        
        
    }
    useEffect(()=>{
        dispatch(getUsers());
    },[dispatch])

  return (
    <div className='w-full flex justify-center bg-no-repeat bg-cover bg-center h-screen overflow-hidden bg-gif flex box-border'>
        {
            error && <div className="w-1/3 flex justify-center absolute mt-36 bg-red-500 text-white rounded-md shadow-xl shadow-black">Bu kullanıcı mevcut</div>
        }
        {
            loginMode ? <div className="loginForm text-gray-800 mx-auto my-auto bg-white rounded-md shadow-xl shadow-black w-1/3 box-border">
            <div className="head text-3xl font-bold m-4 text-center ">Giriş Yap</div>

            <form method='POST' className='box-border' onSubmit={(e)=>{loginHandler(e)}}>

                <div className="username flex w-full items-center flex-nowrap">
                    <h2 className='text-xl m-2 w-[20%] whitespace-nowrap'>Kullanıcı Adı</h2>
                    <input value={username} onChange={(e)=> setUsername(e.target.value)} type="text" className='m-2 w-[70%] outline-none p-1 px-2 rounded-2xl  bg-gray-100 border-2 border-gray-800'/>
                </div>
                <div className="password flex w-full items-center">
                    <h2 className='text-xl m-2 w-[20%] whitespace-nowrap'>Parola</h2>
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className='m-2 w-[70%] outline-none p-1 px-2 rounded-2xl  bg-gray-100 border-2 border-gray-800'/>
                </div>
                <button type="submit" className='w-[100%] p-2 border-8 border-white text-center bg-lime-500 font-bold rounded-md'>Giriş Yap</button>
            </form>
            <button className='w-[100%] p-2 border-8 border-white text-center bg-indigo-500 rounded-md font-bold' onClick={()=>{setLoginMode(false)}}>Kayıt Ol</button>
        </div>
        
        
        :
        
        
        <div className="loginForm text-gray-800 mx-auto my-auto bg-white rounded-md shadow-xl shadow-black w-1/3 box-border">
            <div className="head text-3xl font-bold m-4 text-center ">Kayıt Ol</div>
            <form method='POST' className='box-border text-right' onSubmit={(e)=>{registerHandler(e,username,password,repPassword)}}>
                <div className="username flex w-full items-center flex-nowrap">
                    <h2 className='text-xl m-2 w-[20%] whitespace-nowrap'>Kullanıcı Adı</h2>
                    <input onChange={(e)=> setUsername(e.target.value)} type="text" className='m-2 w-[70%] outline-none p-1 px-2 rounded-2xl  bg-gray-100 border-2 border-gray-800'/>
                </div>
                <div className="password flex w-full items-center">
                    <h2 className='text-xl m-2 w-[20%] whitespace-nowrap'>Parola</h2>
                    <input onChange={(e)=> setPassword(e.target.value)} type="password" className='m-2 w-[70%] outline-none p-1 px-2 rounded-2xl  bg-gray-100 border-2 border-gray-800'/>
                </div>
                <div className="password-repeat flex w-full items-center">
                    <h2 className='text-xl m-2 w-[20%] whitespace-nowrap'>Parola Tekrar</h2>
                    <input onChange={(e)=> setRepPassword(e.target.value)} type="password" className='m-2 w-[70%] outline-none p-1 px-2 rounded-2xl  bg-gray-100 border-2 border-gray-800'/>
                </div>
                <button type="submit" className='w-[100%] rounded-md p-2 border-8 border-white text-center bg-lime-500 font-bold'>Kayıt Ol</button>
            </form>
            <button className='w-[100%] rounded-md p-2 border-8 border-white text-center bg-indigo-500 font-bold' onClick={()=>{setLoginMode(true)}}>Giriş Yap</button>
        </div>
        }

    </div>
  )
}

export default Homepage