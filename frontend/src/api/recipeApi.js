const BASE_URL = 'http://localhost:5000/api/recipes';

export const fetchAllRecipes = async (category = '', search = '') => {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (search) params.append('search', search);

  const url = params.toString() ? `${BASE_URL}?${params.toString()}` : BASE_URL;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch recipes');
  return data.data;
};

export const fetchRecipeById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch recipe details');
  return data.data;
};

export const createRecipe = async (recipeData) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipeData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create recipe');
  return data;
};

export const updateRecipe = async (id, recipeData) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipeData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update recipe');
  return data;
};

export const deleteRecipe = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete recipe');
  return data;
};
