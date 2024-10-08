/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { PutObjectCommand } from '@aws-sdk/client-s3'; // Importar el comando necesario
import { bucket } from '../supabase/bucket'; // Importamos el cliente S3 configurado
import { client } from '../supabase/client';
import Loader from './loader';

function upload() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Obtener el archivo desde el input
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      alert('Por favor selecciona una imagen para subir.');
      return;
    }

    try {
      setUploading(true);
      const fileName = `${Date.now()}_${image.name}`; // Nombre único basado en la fecha actual
      const params = {
        Bucket: 'recuerdos', // Nombre del bucket en Supabase
        Key: fileName, // Nombre del archivo a subir
        Body: image, // El archivo (imagen)
        ContentType: image.type // Tipo de contenido (MIME type)
      };

      // Ejecutamos la subida del archivo
      const command = new PutObjectCommand(params);
      const response = await bucket.send(command);

      // URL de acceso público al archivo (ajústala según tu configuración de acceso)
      const publicUrl = `https://zecbqgvoulnxjagrjvjc.supabase.co/storage/v1/object/public/recuerdos/${fileName}`;

      const { data, error } = await client
        .from('photos')
        .insert([{ url: publicUrl, description }])
        .then((res) => {
          setImage(null);
          setDescription('');
          setImageUrl('');
        });
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 py-6 w-96">
      <span className="flex flex-col gap-2">
        <span className="flex flex-row gap-4">
          <div className="relative flex items-center justify-center border-[2px] border-dashed rounded-md w-full border-zinc-800 bg-zinc-900">
            {imageUrl ? (
              <span className="p-4 flex w-56">
                {/* <img src={imageUrl} alt="preview" className="object-cover" /> */}
                <img
                  src={imageUrl}
                  alt="preview"
                  className="relative object-cover w-full rounded-md"
                />
              </span>
            ) : (
              <span className="py-16 flex flex-col items-center">
                <p className="text-xs text-white/80 text-center">
                  drag and drop a memory
                </p>
                <label
                  className="text-xs text-[#f92f60] text-center cursor-pointer"
                  htmlFor="image"
                >
                  select memory
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </span>
            )}
          </div>
        </span>
      </span>
      <span className="flex flex-col gap-2">
        <textarea
          style={{
            resize: 'none'
          }}
          className="outline-none bg-zinc-900 text-white/80 pl-3 py-3 rounded-md text-xs"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
          cols="30"
          rows="6"
        />
      </span>
      <span className="flex flex-row gap-4 justify-center">
        <button
          type="button"
          onClick={uploadImage}
          disabled={uploading}
          className="justify-center border rounded-md border-white/20 bg-zinc-900 cursor-pointer flex flex-row gap-1"
        >
          {uploading ? (
            <span className="flex justify-center py-1 px-2 w-36">
              <Loader color="#eee" size={20} />
            </span>
          ) : (
            <span className="flex flex-row gap-1 py-1 px-2">
              <h1 className="text-sm text-white">upload memory</h1>
            </span>
          )}
        </button>
      </span>
    </div>
  );
}

export default upload;
