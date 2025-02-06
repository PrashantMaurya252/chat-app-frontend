import  { useContext} from 'react'
import { mainContext } from '../context/GlobalContext'
import { Navigate } from 'react-router-dom'


const AuthRoutes = ({children}) => {

    const {token} = useContext(mainContext)

    
    

    if(token){
        return <Navigate to='/chat' replace/>
    }

  return children
}

export default AuthRoutes