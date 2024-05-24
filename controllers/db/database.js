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
  limit, 
  where
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const COLLECTION_BIKES = "bikes";
const COLLECTION_OWNER = "owners";

const db = getFirestore(app);

export const addBikeData = async (
  ownerId,
  bikeName,
  pricePerHour,
  pricePerDay,
  pricePerWeek,
  description,
  picture,
  username,
  frameMaterial,
  wheelSize,
  suspension,
  brakes,
  changes
) =>
  await setDoc(doc(collection(db, COLLECTION_BIKES)), {
    ownerId,
    bikeName,
    pricePerHour,
    pricePerDay,
    pricePerWeek,
    description,
    picture,
    ownerName,
    frameMaterial,
    wheelSize,
    suspension,
    brakes,
    gears
  });

export const getOwnerBikes = (ownerId) =>
  getDoc(doc(db, COLLECTION_OWNER, ownerId));

export const getBikeById = (bikeId) =>
  getDoc(doc(db, COLLECTION_BIKES, bikeId));

export const getAllBikes = () =>
  getDocs(query(collection(db, COLLECTION_BIKES)));

// Only if user is an owner
export const deleteDocument = (bikeId) =>
  deleteDoc(doc(db, COLLECTION_BIKES, bikeId));
export const deleteDocumentFromOwner = (ownerId, bikeId) =>
  deleteDoc(doc(db, COLLECTION_OWNER, ownerId, COLLECTION_BIKES, bikeId));

export const getRandomBikes = async (currentBikeId, numBikes = 3) => {
  const bikesRef = collection(db, COLLECTION_BIKES);
  const q = query(bikesRef, where("id", "!=", currentBikeId), limit(numBikes));
  const querySnapshot = await getDocs(q);
  let bikes = [];
  querySnapshot.forEach((doc) => {
      bikes.push({ id: doc.id, ...doc.data() });
  });
  return bikes;
};