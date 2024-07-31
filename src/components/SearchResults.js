// src/components/SearchResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`);
        if (response.data.drugGroup.conceptGroup) {
          setResults(response.data.drugGroup.conceptGroup);
          setError('');
          setSuggestions([]);
        } else {
          throw new Error('No results');
        }
      } catch (error) {
        setError('No results found. Please check the spelling or try a different search term.');
        fetchSuggestions();
      }
    };

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${query}`);
        setSuggestions(response.data.suggestionGroup.suggestionList.suggestion || []);
      } catch (error) {
        console.error('Error fetching spelling suggestions', error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div>
      {error && <p>{error}</p>}
      {suggestions.length > 0 && (
        <div>
          <p>Did you mean:</p>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <Link to={`/results?query=${suggestion}`}>{suggestion}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ul>
        {results.map((group, index) =>
          group.conceptProperties?.map((drug) => (
            <li key={drug.rxcui}>
              <Link to={`/drugs/${drug.name}`}>{drug.name}</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
