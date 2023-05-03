import React from 'react'
import { useState } from 'react';

import Accordion from 'react-bootstrap/Accordion';

import JSZip from 'jszip';
import FileSaver from 'file-saver';

function Result(props) {

  const [link, setlink] = useState(false);
  const [img, setimg] = useState(false);
  const [head, sethead] = useState(false);


  if (!props.items) {
    return <div>Loading...</div>;
  }



  const handleButtonClick = async (myurl) => {

    const linkBody = { myurl: myurl };

    const imgList2=[];
    if (img) {
      const response = await fetch('/api/img', {
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
      for(let i = 0; i < text.length; i++) {
        imgList2.push(text[i]);
      }
      // console.log(text);
      
    }

    const linkList2=[];
    if (link) {
      const response = await fetch('/api/links', {
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
      for(let i = 0; i < text.length; i++) {
        linkList2.push(text[i]);
      }
      // console.log(text);
    }

    const headList2=[];
    if (head) {
      const response = await fetch('/api/head', {
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
      for(let i = 0; i < text.length; i++) {
        headList2.push(text[i]);
      }
      // console.log(text);
    }

    const files = [];

    // console.log(link,img,head,linkList2,imgList2,headList2);

    if(imgList2.length) {
      files.push({name: "images.txt",data: imgList2.join('\n')});
    }

    if(linkList2.length) {
      files.push({name: "links.txt",data: linkList2.join('\n')});
    }

    if(headList2.length) {
      files.push({name: "headings.txt",data: headList2.join('\n')});
    }

    const zip = new JSZip();

    files.forEach(file => {
      zip.file(file.name,file.data);
    });

    if(linkList2.length) {
      const folder = zip.folder("level2");
      const urlL2=linkList2[0];
      const response = await fetch('/api/links', {
        method: 'POST',
        body: JSON.stringify({myurl: urlL2}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .catch(e => {
          console.log(e);
        });

      const json = await response.json();
      const text = json.data;
      if(text.length) {
        folder.file("scrapedl2.txt",text.join('\n'));
      }
    }

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

export default Result;