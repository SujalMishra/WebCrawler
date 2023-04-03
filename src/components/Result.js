import React from 'react'

// import axios from 'axios';

function result(props) {
  
  if (!props.items) {
    return <div>Loading...</div>;
  }


    const handleButtonClick= async (myurl) => {
      // const r=axios.post('http://localhost:4000/api/',{myurl:myurl}
      // ).catch(e => {
      //   console.log(e);
      // });
      // console.log(r);
      
      const link={myurl: myurl};
      const response = await fetch('http://localhost:4000/api/', {
        method: 'POST',
        body: JSON.stringify(link),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch(e => {
        console.log(e);
      });

      const json=await response.json();
      const text=json.links;
      // console.log(text);

      const element = document.createElement('a');
      const file = new Blob([text.join('\n')], { type: 'text/plain' });
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
      <button onClick={() => {handleButtonClick(item.link)} }>Scrape</button>
    </div>
  ));

  return (
    <div>
      {itemscom}
    </div>
  ); 
  
}

export default result