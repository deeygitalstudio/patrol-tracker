// src/AuthContext.jsx (or .js)
import React, { useContext, useEffect, useState } from 'react';
import { auth, database } from './firebase'; // Import Firebase auth and database
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        const adminsRef = ref(database, 'admins');
        const adminsQuery = query(adminsRef, orderByChild('email'), equalTo(user.email));

        onValue(adminsQuery, (snapshot) => {
          const admins = snapshot.val();
          if (admins) {
            setIsAdmin(Object.values(admins).some(admin => admin.isAdmin));
          } else {
            setIsAdmin(false);
          }
          setLoading(false);
        });
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
