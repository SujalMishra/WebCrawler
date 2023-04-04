import React from 'react'
import { useState } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import { Button } from 'react-bootstrap';

const options = [
  {value: '', label: 'Select'},
  { value: 'a', label: 'Links' },
  { value: 'img', label: 'Images' },
  { value: 'h', label: 'Headings' }
]

function Result(props) {
  const [tag, setTag] = useState("");

  if (!props.items) {
    return <div>Loading...</div>;
  }



  const handleButtonClick = async (myurl) => {

    const link = { myurl: myurl, tag: tag };
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

    const json = await response.json();
    const text = json.data;
    // console.log(text);

    const element = document.createElement('a');
    const file = new Blob([text.join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'scraped.txt';
    document.body.appendChild(element);
    element.click();

  }

  const handleChange = event => {
    // console.log(event.target.value);
    setTag(event.target.value);
  };

  const ScrImg = async (myurl) => {
    const link = { myurl: myurl };
    const response = await fetch('http://localhost:4000/api/ocr', {
      method: 'POST',
      body: JSON.stringify(link),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(e => {
        console.log(e);
      });
    // console.log(response);

    const json = await response.json();
    const text = json.data;
    // console.log(text);

    const element = document.createElement('a');
    const file = new Blob([text.join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'scraped.txt';
    document.body.appendChild(element);
    element.click();
  }

  const itemscom = props.items.map(item => (

    <div key={item.cacheId} className="res">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1" className='bxx'>
          <Accordion.Header>{item.title}</Accordion.Header>
          <Accordion.Body>
            
            <p>{item.snippet}</p>
            <a href={item.link} target="_blank" rel="noreferrer">Crawl</a>
            <div>
              <select value={tag} onChange={handleChange}>
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button onClick={() => { handleButtonClick(item.link) }}>Scrape</button>
            </div>
            <div>
              <Button onClick={ScrImg} variant="outline-dark">Scrape images</Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  ));

  return (
    <div>
      {itemscom}
    </div>
  );

}

export default Result