export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then((response) => response.json())
}


function postUrl(newUrl) {
  return fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUrl)
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        throw new Error('Something happened while adding the url.')
      }
    })
    .then(response => response.json());
}

export { postUrl };