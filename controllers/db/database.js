import { app } from "../app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const COLLECTION_NAME = "bikes";

const db = getFirestore(app);

export const addBikeData = async (
  ownerId,
  bikeName,
  pricePerHour,
  pricePerDay,
  pricePerWeek,
  description,
  picture
) =>
  await setDoc(doc(collection(db, COLLECTION_NAME), ownerId), {
    ownerId,
    bikeName,
    pricePerHour,
    pricePerDay,
    pricePerWeek,
    description,
    picture,
  });

export const getOwnerBikes = (ownerId) => getDoc(doc(db, COLLECTION_NAME, ownerId));

export const getAllBikes = () => getDocs(query(collection(db, COLLECTION_NAME)));

// Only if user is an owner
export const deleteDocument = (id) => deleteDoc(doc(db, COLLECTION_NAME, id));
