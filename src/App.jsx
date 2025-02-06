
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "./pages/Auth";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AuthRoutes from "./components/AuthRoute";

function App() {

  const location = useLocation()
  
  return (
    <div>
      <div className={`${location.pathname === '/' ? "hidden":""}`}>
      <Header/>
      </div>
      
        <Routes>
          <Route path="/" element={
           
              <Auth />
              
          } />
          <Route path="/chat" element={
            // <ProtectedRoutes>
            <Messages />
          // </ProtectedRoutes>
          } />
          <Route path="/profile" element={
            // <ProtectedRoutes>
            <Profile />
          // </ProtectedRoutes>
        } />
        </Routes> 
    </div>
  );
}

export default App;
