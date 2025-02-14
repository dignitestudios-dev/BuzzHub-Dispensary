import { useEffect, useState } from "react";
import { getUnreadMessageCount } from "../../firebase/firestoreService"; // Import function

const useUnreadMessages = (uid) => {
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    const fetchUnreadCounts = async () => {
      const counts = await getUnreadMessageCount(uid);
      setUnreadCounts(counts);
    };

    fetchUnreadCounts();
  }, [uid]);

  return unreadCounts;
};


export default useUnreadMessages