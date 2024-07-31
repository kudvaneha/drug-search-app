// src/api.js

// URL for the JSON Server
const BASE_URL = 'http://localhost:5000';

// Search for drugs
export const searchDrugs = async (query) => {
  const response = await fetch(`${BASE_URL}/drugs?name=${query}`);
  const data = await response.json();
  return data;
};

// Get spelling suggestions
export const getSpellingSuggestions = async (query) => {
  const response = await fetch(`${BASE_URL}/spellingsuggestions?name=${query}`);
  const data = await response.json();
  return data;
};

// Get drug details
export const getDrugDetails = async (name) => {
  const response = await fetch(`${BASE_URL}/drugDetails?name=${name}`);
  const data = await response.json();
  return data;
};
