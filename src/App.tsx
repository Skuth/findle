import React, { useEffect } from 'react';

import "./styles/global.css"

import Routes from "./routes"

function App() {
  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE}`
  })

  return (
    <Routes />
  );
}

export default App;
