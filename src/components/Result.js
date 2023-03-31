import React from 'react'

function result(props) {
  
  if (!props.items) {
    return <div>Loading...</div>;
  }
  
  const itemscom = props.items.map(item => (
    <div key={item.cacheId}>
      <h3>{item.title}</h3>
      <p>{item.snippet}</p>
      <a href={item.link} target="_blank" rel="noreferrer">Link-{item.link}</a>
    </div>
  ));

  return (
    <div>
      {itemscom}
    </div>
  ); 
  
}

export default result