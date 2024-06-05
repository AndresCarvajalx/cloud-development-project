import { app } from "../app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  getDoc,
  limit,
  where,
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
  frameMaterial,
  wheelSize,
  suspension,
  brakes,
  gears
) => {
  const bikeRef = doc(collection(db, COLLECTION_BIKES));
  setDoc(bikeRef, {
    ownerId,
    bikeName,
    pricePerHour,
    pricePerDay,
    pricePerWeek,
    description,
    picture,
    frameMaterial,
    wheelSize,
    suspension,
    brakes,
    gears,
  });
  return bikeRef.id;
};

export const addOwnerBikes = (ownerId, bikeId) => {
  const ownerRef = doc(db, "owners", ownerId);
  const bikeRef = collection(ownerRef, "bikes");
  return addDoc(bikeRef, { bikeId: bikeId });
};

export const getOwnerBikes = async (ownerId) =>{
  const ownerRef = doc(db, COLLECTION_OWNER, ownerId);
  const bikesRef = collection(ownerRef, 'bikes');
  const bikesSnapshot = await getDocs(bikesRef);
  return bikesSnapshot;
}

export const getBikeById = (bikeId) =>
  getDoc(doc(db, COLLECTION_BIKES, bikeId));

export const getAllBikes = () =>
  getDocs(query(collection(db, COLLECTION_BIKES)));

// Only if user is an owner
export const deleteDocument = (bikeId) =>
  deleteDoc(doc(db, COLLECTION_BIKES, bikeId));

export const deleteDocumentFromOwner = async (ownerId, bikeId) => {
  const ownerRef = doc(db, COLLECTION_OWNER, ownerId);
  const bikesRef = collection(ownerRef, "bikes");
  const bikeRef = doc(bikesRef, bikeId);
  return await deleteDoc(bikeRef);
};

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
