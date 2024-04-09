'use client';
import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import { getMeals } from '@/service/meal/meal';
import { splitArrayIntoGroups } from '@/utils/arrayUtils';
import Spinner from '@/components/Spinner';

export default function Page() {
  const [meals, setMeals] = useState<unknown[][]>([]);
  const [pagination, setPagination] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const paginationSize = {
    page: 1,
    limit: meals.length,
  };

  useEffect(() => {
    const fetchMeals = async () => {
      const data = await getMeals();
      const groupedMeals = splitArrayIntoGroups(data.meals, 10);
      setMeals(groupedMeals);
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  return (
    <section className="flex flex-col items-center h-screen pb-3">
      {isLoading ? (
        <Spinner variant="black" size="lg" />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {meals[pagination - 1]?.map((meal: any) => (
              <Card
                key={meal.idMeal}
                title={meal.strMeal}
                imageUrl={meal.strMealThumb}
                id={meal.idMeal}
              />
            ))}
          </div>
          <div className="pb-3 flex">
            {meals.map((_, index) => (
              <button
                key={index}
                className={`bg-[#212121] text-white p-3 mb-3 text-md font-semibold shadow w-[3rem] active:bg-gray-900 lg:text-xl
                ${index + 1 === pagination ? 'bg-[#2481eb]' : ''} 
                ${index === 0 ? 'rounded-l-xl' : ''} 
                ${index === paginationSize.limit - 1 ? 'rounded-r-xl' : ''}`}
                onClick={() => setPagination(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
