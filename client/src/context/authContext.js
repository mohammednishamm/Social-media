import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [err,setErr]=useState(null)

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8400/api/auth/login", inputs , {
      withCredentials: true,
    });

    setCurrentUser(res.data)
  };


  const logout=async ()=>{
    try{
      await axios.post("http://localhost:8700/api/auth/logout" )
      setCurrentUser(null)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login ,err}}>
      {children}
    </AuthContext.Provider>
  );
};
