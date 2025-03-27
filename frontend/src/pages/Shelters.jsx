import React, { useEffect, useState } from 'react';
import { getShelters } from '../services/shelterService';
import ShelterCard from '../components/ShelterCard';

const Shelters = () => {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    const fetchShelters = async () => {
      const data = await getShelters();
      setShelters(data);
    };
    fetchShelters();
  }, []);

  return (
    <div>
      <h2>Available Shelters</h2>
      {shelters.length > 0 ? (
        shelters.map(shelter => <ShelterCard key={shelter._id} shelter={shelter} />)
      ) : (
        <p>No shelters available</p>
      )}
    </div>
  );
};

export default Shelters;
