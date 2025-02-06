
import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { mainContext } from '../context/GlobalContext'

const Header = () => {
  const {logout} = useContext(mainContext)

 
    const navigate = useNavigate()
    const navItems = [
        {id:1,label:"Chat",path:"/chat"},
        {id:2,label:"Profile",path:"/profile"},
    ]

    const location = useLocation()
    const handleLogout=()=>{
      logout()
      navigate('/')
    }
  return (
    <div className='w-full h-[100px] flex justify-end items-center gap-4 pr-6 border-b-[4px]'>
        {navItems.map((item)=>(
            <span key={item.id} className={`text-lg cursor-pointer ${location.pathname === item.path ? "font-bold":""}`} onClick={()=>navigate(item.path)}>{item.label}</span>
        ))}

        <button className='border-[1px] border-black rounded-md px-2 py-1 cursor-pointer' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Header