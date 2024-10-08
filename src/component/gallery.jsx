import React, { useState, useEffect } from 'react';
import { client } from '../supabase/client';

function gallery() {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await client
        .from('photos')
        .select('*')
        .order('id', { ascending: false });
      if (error) {
        console.log(error);
      } else {
        setPhotos(data);
      }
    };
    fetchResults();
  }, []);
  return (
    <div className="gallery">
      {photos.map((photo) => (
        <div className="image-container tall" key={photo.id}>
          <img
            alt={photo.description}
            className="transform transition-transform duration-300 hover:scale-105"
            src={photo.url}
          />
        </div>
      ))}
    </div>
  );
}

export default gallery;
