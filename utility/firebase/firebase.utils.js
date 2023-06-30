// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
        } from "firebase/auth";


    //firebase cloud firestore setup

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
            } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADhb_Bu-uduqTIUHXraOBt9PM9iL-FtJo",
    authDomain: "yelp-camp-75e5a.firebaseapp.com",
    projectId: "yelp-camp-75e5a",
    storageBucket: "yelp-camp-75e5a.appspot.com",
    messagingSenderId: "489089793571",
    appId: "1:489089793571:web:cdd51bd623415e98a1fb96"
  };

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

const googleProvider=new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:"select_account"
}
)
export const auth=getAuth();
export const signInWithGooglePopUp=()=>signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect=()=>signInWithRedirect(auth,googleProvider);

export const db=getFirestore();//creating a firebase instance

export const addCollectionandDocuments= async (collectionKey,objectsToAdd)=>{
    const collectionRef=collection(db,collectionKey);

    const batch=writeBatch(db);

    objectsToAdd.forEach(object=>{
        const objectRef=doc(collectionRef,object.title.toLowerCase());
        batch.set(objectRef,object);
    })

    await batch.commit();
    console.log('Updating done.');
}

export const getCollectionAndDocuments=async()=>{
    const collectionRef=collection(db,'categories');
    const q=query(collectionRef);

    const querySnapshotDocs=(await getDocs(q)).docs;
    return querySnapshotDocs.map(docSnapshot=>docSnapshot.data());
}

export const createCampDocument= async (document,someOtherFields={})=>{

    if(!document) return;

    //to check an exissting instance of the document
    const campDocRef=doc(db,"camps", document.id);//it creates an user docuent refrence.
    //to get the data related to the above documents
    const Snapshot=await getDoc(campDocRef);//creates a snapshot of user data.

    if(!Snapshot.exists()){
        const {id,title,location}=document;
        const createdAt=new Date();
        try{
            setDoc(campDocRef,{id,title,location,createdAt,...someOtherFields});

        }catch(error){
            console.log("Error creating camp instance", error.message);
        }
    }
    return campDocRef;
}

export const createUserDocumentUsingEmailAndPassword= async (email,password)=>{
    if(!email||!password)return;
    return await createUserWithEmailAndPassword(auth,email,password);


}
export const signInUsingEmailAndPassword= async (email,password)=>{
    if(!email||!password)return;
    return await signInWithEmailAndPassword(auth,email,password);

}

export const signOutUser=async ()=> await signOut(auth);

export const onAuthStateChangedListner = (callback) => onAuthStateChanged (auth,callback);