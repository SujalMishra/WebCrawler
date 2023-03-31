import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

function result(props) {
  
  if (!props.items) {
    return <div>Loading...</div>;
  }

  const scrapeWebsite = async (url) => {
    const response = await axios.get(url);
    const $ = cheerio.load(response);
    
    
    const title = $('title').text();
    
    return title;
  }
  
  const itemscom = props.items.map(item => (
    <div key={item.cacheId}>
      <h3>{item.title}</h3>
      <p>{item.snippet}</p>
      <a href={item.link} target="_blank">Link-{item.link}</a>
      <button onClick={scrapeWebsite(item.link)}>Scrape This link</button>

    </div>
    
  ));

  return (
    <div>
      {itemscom}
    </div>
  ); 
  
}

export default result
