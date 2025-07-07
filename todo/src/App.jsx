import { useState, useEffect } from 'react'
import {db,googleProvider,auth} from './firebase-config'
import { signInWithPopup, createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, addDoc, query, where, orderBy } from 'firebase/firestore'
import './App.css'

function App() {

   const [user, setUser] = useState(null);          // Current user
   const [todos, setTodos] = useState([]);     
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [todoText, setTodoText] = useState('');    // New state for todo input


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

const addTodo = async (todoText, userId) => {
  try {
    await addDoc(collection(db, 'todos'), {
      text: todoText,
      completed: false,
      userId: userId,
      createdAt: new Date()
    });
    console.log('Todo added successfully');
    setTodoText(''); // Clear the input after adding
    fetchTodos(userId); // Refresh the list after adding
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};

const fetchTodos = async (userId) => {
  try {
    const q = query(
      collection(db, 'todos'),
      where('userId', '==', userId), 
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q);
    const todosData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setTodos(todosData)
    console.log('Todos fetched successfully:', todosData.length);
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

// Handle adding a new todo
const handleAddTodo = async () => {
  if (!todoText.trim()) {
    alert('Please enter a todo text');
    return;
  }
  
  if (!user) {
    alert('Please sign in to add todos');
    return;
  }
  
  await addTodo(todoText, user.uid);
};

// Listen for authentication state changes
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
    if (currentUser) {
      fetchTodos(currentUser.uid)
      console.log('User signed in and todos fetched', currentUser.uid);
    }else{
      setTodos([])
    }

  });
  
  return () => unsubscribe();
}, []);

  return (
    <>
    <div>
      <h2>Authentication</h2>
      <input type='email' placeholder='enter your email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
      <input type='password' placeholder='enter your password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
      <button onClick={() => signUp(email, password)}>sign up</button>
      <button onClick={() => signIn(email, password)}>sign in</button>
      <button onClick={signInWithGoogle}>sign up with googleProvider</button>
    </div>
    
    {user && (
      <>

      <div>
        <h2>Add Todo</h2>
        <p>Welcome, {user.displayName || user.email}!</p>
        <input 
          type='text' 
          placeholder='Enter your todo' 
          value={todoText} 
          onChange={(e) => setTodoText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
     
      <div>
        <h2>Your Todos</h2>
        {todos.length === 0 ? (
          <p>No todos yet. Add one above!</p>
        ) : (
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                {todo.text}
                <small> - {todo.createdAt?.toDate().toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
      </>
    )}
    
    </>
  )
}

export default App