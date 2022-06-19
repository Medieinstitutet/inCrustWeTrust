import React, { useState, useEffect } from 'react';

function Dough() {

  const [showRecipe, setShowRecipe] = useState(false);
  const [type, setType] = useState("Napolitana");
  const [doughballs, setDoughballs] = useState(0);
  const [ballWeight, setBallWeight] = useState(0);
  const [water, setWater] = useState(60);
  const [salt, setSalt] = useState(2.5);
  const [sugar, setSugar] = useState(0);
  const [oil, setOil] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  const [ingredients, setIngredients] = useState([
    {ingredient: "flour", amount: ""}, 
    {ingredient: "water", amount: ""},
    {ingredient: "salt", amount: ""}, 
    {ingredient: "sugar", amount: ""}, 
    {ingredient: "oil", amount: ""}
  ]);



  useEffect(() => {
    switch(type) {
      case "Napolitana":
        setWater(60)
        setSalt(2.5)
        setSugar(0);
        setOil(0);
        break;
      case "New York":
        setWater(63)
        setSalt(2.5)
        setSugar(1);
        setOil(1);
        break;
      case "Deep Dish":
        setWater(78)
        setSalt(2.5)
        setSugar(0);
        setOil(2);     
      break;
      default:
     } 
  }, [type]);

  function handleSubmit (e) {
    e.preventDefault();

    setShowRecipe(true);
  }

  // useEffect(() => {
  //   if (ingredients[0].amount <= 0) setShowRecipe(false);
  // }, )

  useEffect(() => {
    console.log('ballweight', ballWeight);
    setTotalWeight(ballWeight * doughballs);
  }, [ballWeight])

  useEffect(() => {
    console.log('doughtballs', doughballs);
    setTotalWeight(ballWeight * doughballs);
  }, [doughballs])


  useEffect(() => {
    console.log('totalweight', totalWeight);
    if(totalWeight > 0){
      console.log('more than zero');
      const newIngredients =[
        {ingredient: "flour", amount: totalWeight}, 
        {ingredient: "water", amount: water},
        {ingredient: "salt", amount: salt}, 
        {ingredient: "sugar", amount: sugar}, 
        {ingredient: "oil", amount: oil}
      ];

      newIngredients.forEach(i => {
        i.amount = ((i.amount/100) * totalWeight).toFixed(2)
      });
    
      setIngredients(newIngredients);
    }
   
  }, [totalWeight])

  useEffect(() => {
    console.log('ingredients', ingredients[1].amount);
    if(ingredients[1].amount) setShowRecipe(true);
  }, [ingredients])

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
        <select name="doughballs" onChange={(e) => setDoughballs(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor={ballWeight}>Dough balls weight (g)</label>
        <select name="ballweight" onChange={(e)=> setBallWeight(e.target.value)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
        <br />   <br />
 
        <label for="water">Water:</label>
        <input name="water" type="number" min="0" max="100" step=".5" value={water} onChange={(e) => setWater(e.target.value)}/>
        <br />

        <label for="salt">Salt:</label>
        <input name="salt" type="number" min="0" max="100" step=".5" value={salt} onChange={(e) => setSalt(e.target.value)}/>
        <br />

        <label for="sugar">Sugar:</label>
        <input name="sugar" type="number" min="0" max="100" step=".5" value={sugar} onChange={(e) => setSugar(e.target.value)}/>
        <br />

        <label for="oil">Oil:</label>
        <input name="oil" type="number" min="0" max="100" step=".5" value={oil} onChange={(e) => setOil(e.target.value)}/>

        <br />
        <button>Calculate</button>
      </form>

      Total weight: {totalWeight}g
      <br />   <br />
      {showRecipe && 
        <div style={{border: '1px solid black'}}>
          Recipe for {type} {doughballs}doughballs á {ballWeight}g 
          <ul> 
            {ingredients.map((i, index) => (
              i.amount > 0 && 
              <li key={index}>{i.ingredient}{i.amount}</li>
            ))}
          </ul>
        </div>
      }
    </>

  )
}

export default Dough;