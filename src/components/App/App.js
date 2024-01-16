import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
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



//FUNCTION TO POST AN ORDER
function addUrl(newUrl) {
  postUrl(newUrl)
    .then(url => {
      // Assuming the API returns the newly added order
      setUrls(prevUrls => [...prevUrls, url]);
    })
    .catch(error => {
      setError(error.message);
      console.log("Error in adding order:", error);
    });
}




  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addUrl={addUrl} />
      </header>

      <UrlContainer urls={urls}/>
      {error && <h2 className='error-message'>Something went wrong.</h2>}
    </main>
  );
}

export default App;
