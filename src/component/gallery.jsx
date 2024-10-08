import React, { useState, useEffect } from 'react';
import { client } from '../supabase/client';

function gallery() {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await client
        .from('photos')
        .select('*')
        .order('date', { ascending: false });
      if (error) {
        console.log(error);
      } else {
        setPhotos(data);
      }
    };
    fetchResults();
  }, []);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-8 items-center">
      {photos.map((photo) => (
        <article key={photo.id} className="flex flex-col gap-8">
          <div className="">
            <img
              alt={photo.description}
              className="rounded-lg transform transition-transform duration-300 hover:scale-110"
              src={photo.url}
            />
          </div>
          <span className="text-white text-xs">{photo.date}</span>
          <span className="text-white text-xs">{photo.description}</span>
        </article>
      ))}
      <span className="text-white text-center">
        over time we will be uploading our memories ...
      </span>
    </div>
  );
}

export default gallery;
