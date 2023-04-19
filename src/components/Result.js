import React from 'react'
import { useState } from 'react';

import Accordion from 'react-bootstrap/Accordion';
// import { Button } from 'react-bootstrap';

import JSZip from 'jszip';
import FileSaver from 'file-saver';

// const options = [
//   { value: '', label: 'Select' },
//   { value: 'a', label: 'Links' },
//   { value: 'img', label: 'Images' },
//   { value: 'h', label: 'Headings' }
// ]

function Result(props) {

  const [link, setlink] = useState(false);
  const [img, setimg] = useState(false);
  const [head, sethead] = useState(false);

  const [linksList, setlinksList] = useState([]);
  const [imgsList, setimgsList] = useState([]);
  const [headsList, setheadsList] = useState([]);

  if (!props.items) {
    return <div>Loading...</div>;
  }



  const handleButtonClick = async (myurl) => {

    const linkBody = { myurl: myurl };

    if (img) {
      const response = await fetch('http://localhost:4000/api/img', {
        method: 'POST',
        body: JSON.stringify(linkBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .catch(e => {
          console.log(e);
        });

      const json = await response.json();
      const text = json.data;
      setimgsList(text);
    }

    if (link) {
      const response = await fetch('http://localhost:4000/api/links', {
        method: 'POST',
        body: JSON.stringify(linkBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .catch(e => {
          console.log(e);
        });

      const json = await response.json();
      const text = json.data;
      setlinksList(text);
    }

    if (head) {
      const response = await fetch('http://localhost:4000/api/head', {
        method: 'POST',
        body: JSON.stringify(linkBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .catch(e => {
          console.log(e);
        });

      const json = await response.json();
      const text = json.data;
      setheadsList(text);
    }

    const files = [];

    if(imgsList.length) {
      files.push({name: "images.txt",data: imgsList.join('\n')});
    }

    if(linksList.length) {
      files.push({name: "links.txt",data: linksList.join('\n')});
    }

    if(headsList.length) {
      files.push({name: "headings.txt",data: headsList.join('\n')});
    }

    const zip = new JSZip();

    files.forEach(file => {
      zip.file(file.name,file.data);
    });

    zip.generateAsync({ type: "blob" }).then(content => {
      FileSaver.saveAs(content, "scraped.zip");
    });

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
              <label><input type="checkbox" checked={link} onChange={() => {setlink(!link)}} />Links</label>
              <label><input type="checkbox" checked={img} onChange={() => {setimg(!img)}} />Images</label>
              <label><input type="checkbox" checked={head} onChange={() => {sethead(!head)}} />Headings</label>
              
              <button onClick={() => { handleButtonClick(item.link) }}>Scrape</button>
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