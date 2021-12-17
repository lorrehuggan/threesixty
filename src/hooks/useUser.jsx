import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const useUser = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({});

  //get user doc from firebase firestore

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const getUser = async () => {
      const data = await getDoc(doc(db, 'users', currentUser?.uid));
      if (data.exists()) {
        const user = data.data();
        setUserData({
          likes: user.liked_film,
          name: user.name,
          email: user.email,
          id: user.id,
        });
      } else {
        console.log('no such doc');
      }
    };
    getUser();
  }, [currentUser]);

  return { userData };
};

export default useUser;
