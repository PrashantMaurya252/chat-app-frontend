import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header/>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
     
    </div>
  );
}

export default App;
