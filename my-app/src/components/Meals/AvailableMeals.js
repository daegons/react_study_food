import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoding] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://daegon---react-project-default-rtdb.firebaseio.com/shoes.json"
      );

      if (!response.ok) {
        throw new Error("뭔가 잘못되었어요!!.");
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          imgURL: responseData[key].imgURL,
        });
      }
      setMealsData(loadedMeals);
      setIsLoding(false);
    };

    fetchMeals().catch((error) => {
      setIsLoding(false);
      setHttpError(error.message);
    });
  }, []); //[]처음 로딩 될 때 한번만 실행

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <h2>Loading....</h2>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = mealsData.map((list) => {
    return (
      <MealItem
        key={list.id}
        id={list.id}
        name={list.name}
        description={list.description}
        price={list.price}
        imgURL={list.imgURL}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
