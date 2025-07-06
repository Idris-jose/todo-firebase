import { useState, useEffect } from 'react'
import {db} from './firebase-config'
import { collection, getDocs,addDoc } from 'firebase/firestore'
import './App.css'

function App() {
  const [newName,setNewName] =useState("")
  const [newAge,setNewAge] = useState (0)
  const [users,setUsers] = useState([])
  const userCollectionRef = collection(db,"test")
  
  const createUser= async () =>{
    await addDoc(userCollectionRef, {name: newName, age: newAge})
  }

  useEffect( () => {
      const getUsers = async ()=> {
         const data = await getDocs(userCollectionRef)
         setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      }
       getUsers()
  }, [])
  return (
    <>
    <input placeholder='name...' type='string' onChange={(e) => setNewName(e.target.value)}/>
     <input placeholder='age' type='number' onChange={(e) => setNewAge(e.target.value)}/>
     <button onClick={createUser}>createUser</button>
     {users.map((user) => {
      return (
        <div className='user' key={user.id}>
          <h1>{user.name}</h1>
         <p>{user.phone}</p>
          <p>{user.age}</p>
        </div>
      )
     })}
    
    </>
  )
}

export default App
