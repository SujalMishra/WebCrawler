import React from 'react'

function result(props) {
  
  if (!props.items) {
    return <div>Loading...</div>;
  }

  // function createTextFile(text) {
  //   const blob = new Blob([text], { type: 'text/plain' });
  //   return URL.createObjectURL(blob);
  // }

  const text='Scraped'

    function handleButtonClick() {
      const element = document.createElement('a');
      const file = new Blob([text], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'scraped.txt';
      document.body.appendChild(element);
      element.click();
    }
  
  const itemscom = props.items.map(item => (
    <div key={item.cacheId}>
      <h3>{item.title}</h3>
      <p>{item.snippet}</p>
      <a href={item.link} target="_blank" rel="noreferrer">Link-{item.link}</a>
      <button onClick={handleButtonClick}>Scrape</button>
    </div>
  ));

  return (
    <div>
      {itemscom}
    </div>
  ); 
  
}

export default result