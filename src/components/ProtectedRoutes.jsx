import  { useContext} from 'react'
import { mainContext } from '../context/GlobalContext'
import { Navigate } from 'react-router-dom'


const ProtectedRoutes = ({children}) => {

    const {token} = useContext(mainContext)

    
    

    if(!token){
        return <Navigate to='/' replace/>
    }

  return children
}

export default ProtectedRoutes