import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('')
  


useEffect(() => {
  getUrls()
    .then(data => { 
    setUrls(data.urls)}) // Update the state 
    .catch(error => setError(error.message));  //catch the error

}, []);




  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        {/* <UrlForm addURL={addURL} /> */}
      </header>

      <UrlContainer urls={urls}/>
      {error && <h2 className='error-message'>Something went wrong.</h2>}
    </main>
  );
}

export default App;
