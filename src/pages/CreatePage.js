// App.js
import React, { useState } from 'react';
import '../App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


// Firebase Configuration
const firebaseConfig = {
  databaseURL: "https://latihan1-1b180-default-rtdb.asia-southeast1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendData = () => {
    if (name === '' || email === '' || message === '') {
      alert('All fields are required!');
      return;
    }

    const listRef = database.ref('messages/');
    const newRef = listRef.push();
    newRef.set({
      'name': name,
      'email': email,
      'message': message,
    });

    alert('Data sent successfully!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container">
      <h1>Buat Data Baru</h1>
      <div className="form">
        <label>Nama</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="masukan namamu" 
        />
        <label>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="masukan emailmu" 
        />
        <label>pesan</label>
        <textarea 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="masukan pesan" 
        />
        <button onClick={sendData}>Submit</button>
      </div>

      <div className="btn-group">
        <button onClick={() => window.location.href = '/'}>Kembali ke Home</button>
      </div>
    </div>
  );
}

export default App;
