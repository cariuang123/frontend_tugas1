// pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import '../App.css';
const firebaseConfig = {
  databaseURL: "https://latihan1-1b180-default-rtdb.asia-southeast1.firebasedatabase.app"
};


firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function HomePage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const fetchedData = database.ref('messages/');
      fetchedData.on('value', (snapshot) => {
        const data = snapshot.val();
        const formattedData = Object.keys(data || {}).map(key => ({
          id: key,
          ...data[key]
        }));
        setMessages(formattedData);
      });
    };
    fetchData();
  }, []);

  const deleteData = (id) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      database.ref('messages/' + id).remove();
    }
  };

  const [updateData, setUpdateData] = useState({ name: '', email: '', message: '' });
  const [selectedId, setSelectedId] = useState('');

  const openSlideBox = (id, name, email, message) => {
    setUpdateData({ name, email, message });
    setSelectedId(id);
    document.getElementById('slideBox').style.display = 'block';
  };

  const closeSlideBox = () => {
    document.getElementById('slideBox').style.display = 'none';
  };

  const handleUpdate = () => {
    database.ref('messages/' + selectedId).update(updateData);
    closeSlideBox();
  };

  return (
    <div className="container">
      <h1>Tugas: desain front end  H</h1>
      <h1>Nama : Bambang Permadi , Npm : 5220411425</h1>
   
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>pesan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
              <td>
                <button onClick={() => openSlideBox(msg.id, msg.name, msg.email, msg.message)}>Update</button>
                <button className="delete" onClick={() => deleteData(msg.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="btn-group">
        <Link to="/create">
          <button>Buat Data Baru</button>
        </Link>
      </div>

      <div className="slide-box" id="slideBox">
        <div className="close-btn">
          <button onClick={closeSlideBox}>Close</button>
        </div>
        <h2>Update Data</h2>
        <label>Nama: </label>
        <input
          type="text"
          value={updateData.name}
          onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
          placeholder="Enter name"
        />
        <br /><br />
        <label>Email: </label>
        <input
          type="email"
          value={updateData.email}
          onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
          placeholder="Enter email"
        />
        <br /><br />
        <label>pesan: </label>
        <textarea
          value={updateData.message}
          onChange={(e) => setUpdateData({ ...updateData, message: e.target.value })}
          placeholder="Enter message"
        />
        <br /><br />
        <button onClick={handleUpdate}>Save</button>
      </div>
    </div>
  );
}

export default HomePage;
