import React, { useState } from 'react'

const Profile = () => {
    const [userData,setUserData] = useState({
        name:"",
        phone:"",
        email:"",
        role:""
    })
    const handleOnChange=(name,value)=>{
        setUserData((prev)=>({...prev,[name]:value}))
    }
    const handleEdit = ()=>{
        console.log("submitted")
    }
  return (
    <div className='flex justify-center items-center w-full h-screen'>
        <div className='w-[40%] border-[2px] border-black rounded-md '>
            <h1 className='text-center text-xl font-bold'>Edit Profile</h1>
            <form onSubmit={handleEdit} className='p-2 flex flex-col gap-3 w-full '>
            <input type='text' name='name' value={userData.name} placeholder='Name' onChange={(e)=>handleOnChange("name",e.target.value.trimStart())} className='w-full px-2 py-1 border-[2px] rounded-md'/>
            <input type='text' name='email' value={userData.email} placeholder='Email' onChange={(e)=>handleOnChange("email",e.target.value.trimStart())} className='w-full px-2 py-1 border-[2px] rounded-md'/>
            
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
            <button className='w-full py-1 text-center bg-black text-white font-semibold rounded-md cursor-pointer'>Edit</button>
            </form>
        </div>
    </div>
  )
}

export default Profile