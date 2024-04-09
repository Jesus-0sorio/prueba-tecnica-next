'use client';
import { useState, useEffect } from 'react';
import { getMealById } from '@/service/meal/meal';
import Spinner from '@/components/Spinner';
import Image from 'next/image';

export default function Page({ params }: { params: { id: string } }) {
  const [meal, setMeal] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [measures, setMeasures] = useState<any[]>([]);

  useEffect(() => {
    const fetchMeal = async () => {
      const data = await getMealById(params.id);
      setMeal(data.meals[0]);

      const ingredients = Object.entries(data.meals[0]).filter(
        ([key, value]) =>
          key.includes('strIngredient') && value !== '' && value !== null
      );

      const measures = Object.entries(data.meals[0]).filter(
        ([key, value]) =>
          key.includes('strMeasure') && value !== '' && value !== null
      );
      setIngredients(ingredients);
      setMeasures(measures);
      setIsLoading(false);
    };

    fetchMeal();
  }, [params.id]);

  return (
    <>
      {isLoading ? (
        <div className="h-screen">
          <Spinner variant="black" size="lg" />
        </div>
      ) : (
        <div className="shadow-lg rounded-2xl px-4 py-6 flex flex-col gap-4 lg:w-[50rem] mx-auto border border-gray-100">
          <p className="text-3xl lg:text-4xl text-center font-bold">
            {meal.strMeal}
          </p>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="w-full md:w-[38rem] mx-auto rounded-lg object-fill"
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
          <p className="text-2xl text-center font-bold lg:text-3xl">
            Ingredients:
          </p>
          <ul className="list-disc pl-6">
            {ingredients.map(([key, value], index) => (
              <li key={index}>
                {value} - {measures[index][1]}
              </li>
            ))}
          </ul>
          <p className="text-2xl text-center font-bold lg:text-3xl">
            Instructions:
          </p>
          <p className="text-left">{meal.strInstructions}</p>
        </div>
      )}
    </>
  );
}
