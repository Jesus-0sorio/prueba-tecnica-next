export const getMeals = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL_MEAL}/filter.php?c=beef`;
  const response = await fetch(url, {
    method: 'GET',
  });
  const data = await response.json();

  if (response.status >= 500) {
    return 'Server error';
  }

  return data;
};

export const getMealById = async (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL_MEAL}/lookup.php?i=${id}`;
  const response = await fetch(url, {
    method: 'GET',
  });
  const data = await response.json();

  if (response.status >= 500) {
    return 'Server error';
  }

  return data;
};
