import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase';

const useUser = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({});

  //get user doc from firebase firestore

  useEffect(() => {
    //----> realtime listener <----
    if (currentUser) {
      const docRef = doc(db, 'users', currentUser?.uid);
      const unsub = onSnapshot(docRef, (document) => {
        if (document.exists()) {
          const user = document.data();
          setUserData({
            likes: user.liked_film,
            name: user.name,
            email: user.email,
            id: user.id,
          });
        } else {
          console.log('error: no items available');
        }
      });
      return () => {
        unsub();
      };
    }
  }, [currentUser]);

  return { userData };
};

export default useUser;
