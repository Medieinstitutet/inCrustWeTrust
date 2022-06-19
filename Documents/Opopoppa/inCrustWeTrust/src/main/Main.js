import React, { useState, useEffect } from 'react';
import Contact from './Contact';
import Dough from './Dough';


function Main({showSite}) {

  return (
    <main>
      {showSite === "Contact" && <Contact />} 
      {showSite === "Dough" && <Dough />} 
    </main>
  )
}

export default Main;