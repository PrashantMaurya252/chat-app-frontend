import  { useState } from 'react'
import { url } from '../data/config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Auth = () => {

    const navigate = useNavigate()
    const [selectedForm,setSelectedForm] = useState("login")
    const [loading,setloading] = useState(false)

    const [userData,setUserData] = useState({
        name:"",
        role:"",
        phone:"",
        password:"",
        email:""
    })
    const [loginUserData,setloginUserData] = useState({
        email:"",
        password:""
    })
    const handleOnChange=(name,value)=>{

        setUserData((prev)=>({...prev,[name]:value}))
    }

    const handleLoginChange =(name,value)=>{
        setloginUserData((prev)=>({...prev,[name]:value}))
    }


    const handleSignup = async(e)=>{
        e.preventDefault();
        setloading(true)
        try {
            const response = await fetch(`${url}/user/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(userData)
            });

            const data =await response.json()

           if(data.success){
            toast.success("User created successfully")
            setSelectedForm("login")
           }
        } catch (error) {
            console.log(error,"error")
        }finally{
            setloading(false)
        }
    }

    const handleLogin = async(e)=>{
        e.preventDefault()
        setloading(true)
        try {
            const response = await fetch(`${url}/user/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(loginUserData)
            });

            const data =await response.json()

            if(data.success){
                toast.success("welcome")
                localStorage.setItem("token",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                navigate('/chat')

            }else{
                toast.error(data.message)
            }

            
        } catch (error) {
            console.log(error,"error")
        }finally{
            setloading(false)
        }
        
    }
  return (
    <div className=' flex justify-center items-center w-full '>
       <div className='flex flex-col justify-center items-center w-[30%] border-[2px] border-black rounded-md mt-[100px]'>
        <h1 className='text-center text-xl font-semibold'>{selectedForm === "login" ? "Login" : "SignUp"}</h1>

        {selectedForm === "login" ?(
            <form onSubmit={handleLogin} method='POST' className='w-full  flex flex-col p-4 gap-4 '>
           
            <input type='text' name='email' value={loginUserData.email} placeholder='Email' onChange={(e)=>handleLoginChange("email",e.target.value.trimStart())} className='w-full px-2 py-1 border-[2px] rounded-md'/>
            <input type='text' name='password' value={loginUserData.password} placeholder='Password' onChange={(e)=>handleLoginChange("password",e.target.value.trimStart())} className='w-full px-2 py-1 border-[2px] rounded-md'/>
            <button disabled={loading} className='w-full py-1 text-center bg-black text-white font-semibold rounded-md cursor-pointer'>{loading ? "Loading" : "Login"}</button>
            <div className='flex justify-end items-center text-sm'>
                <span>Create an account <span className='text-blue-500 font-semibold cursor-pointer' onClick={()=>{setSelectedForm("signup")}}>Sign Up</span></span>
            </div>
          </form>
        ):(
            <form onSubmit={handleSignup} method='POST' className='w-full  flex flex-col p-4 gap-4 '>
            <input type='text' name='name' value={userData.name} placeholder='Name' onChange={(e)=>handleOnChange("name",e.target.value.trimStart())} className='w-full px-2 py-1 border-[2px] rounded-md'/>
            <input type='text' name='email' value={userData.email} placeholder='Email' onChange={(e)=>handleOnChange("email",e.target.value.trimStart())} className='w-full px-2 py-1 border-[2px] rounded-md'/>
            <input type='text' name='password' value={userData.password} placeholder='Password' onChange={(e)=>handleOnChange("password",e.target.value.trimStart())} className='w-full px-2 py-1 border-[2px] rounded-md'/>
            <input type='number' name='phone' value={userData.phone} placeholder='Phone' onChange={(e)=>handleOnChange("phone",e.target.value.trimStart())} className='w-full px-2 py-1 border-[2px] rounded-md'/>
            <div className='flex flex-col gap-1'>
                <label className='text-sm font-semibold'>Role</label>
                <select className='border-[2px] border-black rounded-md px-2 py-1' value={userData.role} onChange={(e)=>handleOnChange("role",e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                    <option value="Institute">Institute</option>
                    
                </select>
            </div>
            <button disabled={loading} className='w-full py-1 text-center bg-black text-white font-semibold rounded-md cursor-pointer'>{loading ? "Loading":"SignUp"}</button>
            <div className='flex justify-end items-center text-sm'>
                <span>Already have an account ? <span className='text-blue-500 font-semibold cursor-pointer' onClick={()=>{setSelectedForm("login")}}>Login</span></span>
            </div>
          </form>
        )}
          
          
       </div>
    </div>
  )
}

export default Auth