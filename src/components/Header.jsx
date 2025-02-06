import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const navItems = [
        {id:1,label:"Chat",path:"/chat"},
        {id:2,label:"Profile",path:"/profile"},
    ]

    const location = useLocation()
  return (
    <div className='w-full h-[100px] flex justify-end items-center gap-4 pr-6 border-b-[4px]'>
        {navItems.map((item,index)=>(
            <span key={item.id} className={`text-lg cursor-pointer ${location.pathname === item.path ? "font-bold":""}`} onClick={()=>navigate(item.path)}>{item.label}</span>
        ))}
    </div>
  )
}

export default Header