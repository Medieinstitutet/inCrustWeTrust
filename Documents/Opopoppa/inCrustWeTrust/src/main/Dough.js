import React, { useState, useEffect } from 'react';

function Dough() {

  const [showRecipe, setShowRecipe] = useState(false);
  const [type, setType] = useState("Napolitana");
  const [doughballs, setDoughballs] = useState("");
  const [ballWeight, setBallWeight] = useState("");
  const [water, setWater] = useState("");
  const [sugar, setSugar] = useState(2.5);
  const [totalWeight, setTotalWeight] = useState("");

  const [ingredients, setIngredients] = useState([
    {ingredient: "flour", amount: ""}, 
    {ingredient: "water", amount: ""},
    {ingredient: "salt", amount: ""}, 
    {ingredient: "sugar", amount: ""}, 
    {ingredient: "oil", amount: ""}
  ]);

  //multiply doughballs with size for total amount/weight
  function handleTotalWeight (e) {

    if(e.target.name === "doughballs") {
      setDoughballs(e.target.value);
      setTotalWeight(e.target.value * ballWeight)
    } else {
      setBallWeight(e.target.value);
      setTotalWeight(e.target.value * doughballs)
    }

  }


  function handleSubmit (e) {
    e.preventDefault();

    let sugar;
    let oil;
    let salt;

    switch(type) {
      case "Napolitana":
        sugar = .1;
        oil = 0;
        salt = .025;
        break;
      case "New York":
        sugar = .01;
        oil = .01;
        salt = .025;
        break;
      case "Deep Dish":
        sugar = 0;
        oil = .02;
        salt = .025;
      break;
      default:
     } 
    
    const newIngredients =[
      {ingredient: "flour", amount: totalWeight}, 
      {ingredient: "water", amount: [...water]},
      {ingredient: "salt", amount: salt}, 
      {ingredient: "sugar", amount: sugar}, 
      {ingredient: "oil", amount: oil}
    ];

    newIngredients.forEach(i => {
      i.amount = (i.amount * totalWeight).toFixed(2)
    });
   
    setIngredients(newIngredients);

  }

  useEffect(() => {
    if (ingredients[0].amount <= 0) setShowRecipe(false);
  }, )


  useEffect(() => {
    setShowRecipe(true);
  }, ingredients)

  return (
    <>
      <form onSubmit={handleSubmit}>
         <label htmlFor="type"> Type of pizza</label>
        <br />
        <select name="type" onChange={(e) => setType(e.target.value)}>
          <option value="Napolitana" >Napolitana</option>
          <option value="New York" >New York</option>
          <option value="Deep Dish" >Deep Dish</option>
        </select>
        <br />   <br />

        <label htmlFor={doughballs}>Dough balls</label>
        <select name="doughballs" onChange={handleTotalWeight}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor={ballWeight}>Dough balls weight (g)</label>
        <select name="ballweight" onChange={handleTotalWeight}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
        <br />   <br />
 
        <label htmlFor="water">Water</label>
        <select name="water" onChange={(e) => setWater(e.target.value)}>
        {type === "Napolitana" && (
          <>
            <option selected value="60">60%</option>
            <option value="61">61%</option>
            <option value="62">62%</option>
            <option value="63">63%</option>
          </>)
        }
          {type === "New York" && (    
            <option value="63">63%</option>)}
          {type === "Deep Dish" && (           
            <>
              <option value="75">75%</option>
              <option value="76">76%</option>
              <option value="77">77%</option>
              <option selected value="78">78%</option>
              <option value="79">79%</option>
              <option value="80">80%</option>
            </>
          )}
        </select>
        <br />   <br />
        <label for="sugar">Sugar:</label>
        <input name="sugar" type="number" placeholder="2.5" min="1" max="100" step=".1" value={sugar} onChange={(e) => setSugar(e.target.value)}/><br />
        <input type="number" placeholder="Oil" />
        <br />
        <input type="number" placeholder="Salt" /><br />
        <button>Calculate</button>
      </form>

      {totalWeight}
      <br />   <br />
      {showRecipe && 
        <div style={{border: '1px solid black'}}>
          Recipe for {type} {doughballs}doughballs á {ballWeight}g 
          <ul> 
          {ingredients.map((i, index) => (
             <li key={index}>{i.ingredient}{i.amount}</li>
              )) }
          </ul>
        </div>
      }
    </>

  )
}

export default Dough;