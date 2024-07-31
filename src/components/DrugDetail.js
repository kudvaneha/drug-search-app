// src/components/DrugDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DrugDetail = () => {
  const { drugName } = useParams();
  const [drugDetails, setDrugDetails] = useState(null);
  const [ndcs, setNdcs] = useState([]);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drugName}`);
        const rxcui = response.data.idGroup.rxnormId[0];
        const detailResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/properties.json`);
        setDrugDetails(detailResponse.data.properties);
        const ndcResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs.json`);
        setNdcs(ndcResponse.data.ndcGroup.ndcList.ndc || []);
      } catch (error) {
        console.error('Error fetching drug details', error);
      }
    };
    fetchDrugDetails();
  }, [drugName]);

  if (!drugDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{drugDetails.name}</h1>
      <p>RxCUI: {drugDetails.rxcui}</p>
      <p>Synonym: {drugDetails.synonym}</p>
      <h2>NDCs</h2>
      <ul>
        {ndcs.map((ndc) => (
          <li key={ndc}>{ndc}</li>
        ))}
      </ul>
    </div>
  );
};

export default DrugDetail;
