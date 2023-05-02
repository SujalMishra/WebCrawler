import { useState, useEffect } from 'react';
import './App.css';
import Result from './components/Result.js';

import NavBar from './components/Navbar';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

import { Button } from 'react-bootstrap';


function App() {

  const [query, setQuery] = useState("");
  const [num_results, setNumresults] = useState("5");
  const [results, setResults] = useState(null);

  const [d, setD] = useState([]);

  const search = async () => {
    // console.log(query);
    const api_key = 'AIzaSyAmGV4u57Ej4qC692Dome4MFxUI53Pdbe4'
    const search_engine_id = '727a51931420242ed'
    const url = `https://www.googleapis.com/customsearch/v1?key=${api_key}&cx=${search_engine_id}&q=${query}&num=${num_results}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setResults(data);
        // console.log(data);
        const a = data.items;
        setD(a);
        // for(var i=0; i<a.length; i++) {
        //   linksForScrp.push(a[i].link);
        // }
        // console.log(linksForScrp);
      })
      .catch(error => console.error(error));
  }

  const scrpAll = async () => {
    // console.log(d);
    const files = [];
    const img = true, linkB = true, head = true;
    for (var i = 0; i < num_results; i++) {
      const linkBody = { myurl: d[i].link }
      const imgList2 = [];
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
        for (let i = 0; i < text.length; i++) {
          imgList2.push(text[i]);
        }
        // console.log(text);
      }

      const linkList2 = [];
      if (linkB) {
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
        for (let i = 0; i < text.length; i++) {
          linkList2.push(text[i]);
        }
        // console.log(text);
      }

      const headList2 = [];
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
        for (let i = 0; i < text.length; i++) {
          headList2.push(text[i]);
        }
        // console.log(text);

      }



      if (imgList2.length) {
        files.push({ name: `images${i}.txt`, data: imgList2.join('\n') });
      }

      if (linkList2.length) {
        files.push({ name: `links${i}.txt`, data: linkList2.join('\n') });
      }

      if (headList2.length) {
        files.push({ name: `headings${i}.txt`, data: headList2.join('\n') });
      }
    }
    const zip = new JSZip();

    files.forEach(file => {
      zip.file(file.name, file.data);
    });

    zip.generateAsync({ type: "blob" }).then(content => {
      FileSaver.saveAs(content, "scraped_complete.zip");
    });

  }

  useEffect(() => {
    setQuery("");
  }, []);


  return (
    <div>
      <NavBar />
      <div className="App">
        <h1>DataDigger</h1>

        <div className='fields'>
          <input placeholder='Search Something ...' id='search' onChange={(e) => {
            setQuery(e.target.value)
          }}
            type={"text"}>

          </input>
          <input placeholder='number' id='num' onChange={(e) => {
            setNumresults(e.target.value)
          }}
            type={"number"}>

          </input>
        </div>

        <Button variant="outline-light" id='some' onClick={search}> Search </Button>

        {results &&

          <div>
            <div className='myScr'>
              <Button variant='outline-light' onClick={scrpAll}>Scrape All</Button>
            </div>
            <div>
              {/* <button className="btn">Download</button> */}
            </div>
            <Result {...results} />
          </div>
        }
      </div>



    </div>

  );
}

export default App;
