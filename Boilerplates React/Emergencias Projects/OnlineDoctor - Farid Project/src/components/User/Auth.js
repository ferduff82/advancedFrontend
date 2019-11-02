import React, { useEffect, useState } from "react";
import {withRouter} from 'react-router-dom';
import app from "../../config/DBConnection";

export const AuthContext = React.createContext();

function AuthProvider({ children }){
  const [currentUser, setCurrentUser] = useState(() => app.auth().currentUser )

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged(setCurrentUser)    
    return () => unsubscribe()
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default withRouter(AuthProvider)