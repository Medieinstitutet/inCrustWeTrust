import React, { useState, useEffect } from 'react';
import Form from './Form';
import Recipe from './Recipe';
import Style from './Style';
import Dough from './Dough';


function Main({showSite}) {

  return (
    <main>
      {showSite === "Contact" && <Form />} 
      {showSite === "Recipe" && <Recipe />} 
      {showSite === "Style" && <Style />} 
      {showSite === "Dough" && <Dough />} 
    </main>
  )
}

export default Main;