import  { useContext, useEffect, useState } from 'react'
import { url } from '../data/config'
import { mainContext } from '../context/GlobalContext'
import { toast } from 'react-toastify'

const Profile = () => {

    const {user} = useContext(mainContext)
    const [setLoading] = useState(false)

    const [userData,setUserData] = useState({
        name:"",
        phone:"",
        email:"",
        role:""
    })

    
    const userProfile =async()=>{
        try {
            const response = await fetch(`${url}/user/userProfile`,{
                method:"GET",
                headers:{
                    authorization:`Bearer ${localStorage.getItem("token")}`,
                    "Content-Type":"application/json"       
                },

            })
            if(!response.ok){
                throw new Error("Server Error")
            }

            const data = await response.json()
            if(data.success){
                console.log(data)
                setUserData({
                    name:data.user.name,
                    phone:data.user.phone,
                    email:data.user.email,
                    role:data.user.role,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        
            userProfile()
        
    },[])
    const handleOnChange=(name,value)=>{
        setUserData((prev)=>({...prev,[name]:value}))
    }
    const handleEdit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`${url}/user/editProfile`,{
                method:"POST",
                headers:{
                    authorization:`Bearer ${localStorage.getItem("token")}`,
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(userData)
            })

            if(!response.ok){
                throw new Error("Server not working")
            }

            const data = await response.json()
            if(data.success){
                toast.success("Profile updated successfully")
                userProfile()
                
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    
  return (
    <div className='flex justify-center items-center w-full h-screen'>
        <div className='w-[40%] border-[2px] border-black rounded-md '>
            <h1 className='text-center text-xl font-bold'>Edit Profile</h1>
            <form onSubmit={handleEdit} method='POST' className='p-2 flex flex-col gap-3 w-full '>
            <input type='text' name='name' value={userData.name } placeholder='Name' onChange={(e)=>handleOnChange("name",e.target.value.trimStart())} className='w-full px-2 py-1 border-[2px] rounded-md'/>
            <input type='text' name='email' value={userData.email } placeholder='Email' onChange={(e)=>handleOnChange("email",e.target.value.trimStart())} className='w-full px-2 py-1 border-[2px] rounded-md'/>
            
            <input type='number' name='phone' value={userData.phone } placeholder='Phone' onChange={(e)=>handleOnChange("phone",e.target.value.trimStart())} className='w-full px-2 py-1 border-[2px] rounded-md'/>
            <div className='flex flex-col gap-1'>
                <label className='text-sm font-semibold'>Role</label>
                <select className='border-[2px] border-black rounded-md px-2 py-1' value={userData.role} onChange={(e)=>handleOnChange("role",e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                    <option value="Institute">Institute</option>
                    
                </select>
            </div>
            <button className='w-full py-1 text-center bg-black text-white font-semibold rounded-md cursor-pointer' >Edit</button>
            </form>
        </div>
    </div>
  )
}

export default Profile