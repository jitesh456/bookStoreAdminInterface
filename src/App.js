import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddBook from './component/AddBook';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h3>Book Store Admin Interface </h3>
      </header>
      <div className="admin-form">
        <AddBook/>
      </div>
    </div>
  );
}

export default App;
