import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserObjByUserId } from '../services/firebase';

export default function useUser() {
  const { user } = useContext(UserContext);
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    async function getUserByUserId() {
      const [response] = await getUserObjByUserId(user.uid);
      setActiveUser(response);
    }
    if (user?.uid) {
      getUserByUserId();
    }
  }, [user]);
  return { user: activeUser };
}
