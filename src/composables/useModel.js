import { app } from "../utils/firebase";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore/lite";

export default () => {
  const db = getFirestore(app);
  const collectionName = "videos";
  const dbCollection = collection(db, collectionName);

  const getVideos = async () => {
    const q = query(dbCollection, orderBy("createdAt", "desc"));
    const videoSnapshot = await getDocs(q);
    return videoSnapshot.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
      };
    });
  };

  const getVideo = async (id) => {
    const docRef = doc(db, collectionName, id);
    const item = await getDoc(docRef);

    return {
      id: item.id,
      ...item.data(),
    };
  };

  const addVideo = async (data) => {
    const item = await addDoc(dbCollection, {
      ...data,
      createdAt: Timestamp.now(),
    });
    return item.id;
  };

  const deleteVideo = async (id) => {
    const docRef = doc(db, collectionName, id);
    return deleteDoc(docRef);
  };

  return {
    getVideos,
    getVideo,
    addVideo,
    deleteVideo,
  };
};
