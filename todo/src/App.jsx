import { useState, useEffect } from 'react'
import {db,googleProvider,auth} from './firebase-config'
import { signInWithPopup, createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs,addDoc } from 'firebase/firestore'
import './App.css'

function App() {
   
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


    const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created:', userCredential.user.uid);
  } catch (error) {
    console.error('Sign up error:', error.message);
  }
};

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user.uid);
  } catch (error) {
    console.error('Sign in error:', error.message);
  }
};

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Google sign in successful:', result.user.displayName);
  } catch (error) {
    console.error('Google sign in error:', error.message);
  }
};

  return (
    <>
    <input type='email' placeholder='enter your email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
    <input type='password' placeholder='enter your password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
    <button onClick={() => signUp(email, password)}>sign up</button>
    <button onClick={() => signIn(email, password)}>sign in</button>
    <button onClick={signInWithGoogle}>sign up with googleProvider</button>
    
    
    </>
  )
}

export default App
