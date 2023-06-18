import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import mealsData from "./Meal.json";

const AvailableMeals = () => {
  const [meals, setMeals]= useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(()=> {
    const fectchMeals = async () => {
      // const response = await fetch("https://food-app-79687-default-rtdb.firebaseio.com/Meals.json");
      
      // if(!response.ok){
      //   throw new Error('Something went wrong!');
      // }
      
      // const responseData = await response.json();

      const loadedMeals = [];
      const responseData = mealsData;

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fectchMeals().catch((error)=> {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if(isLoading){
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if(error){
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    )
  }

  const mealsList = meals.map(meal => (
    <MealItem 
      key={meal.id} 
      id={meal.id}
      name={meal.name} 
      description={meal.description} 
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
