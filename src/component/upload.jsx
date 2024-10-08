/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday
} from 'date-fns';
import React, { useState } from 'react';
import { PutObjectCommand } from '@aws-sdk/client-s3'; // Importar el comando necesario
import { bucket } from '../supabase/bucket'; // Importamos el cliente S3 configurado
import { client } from '../supabase/client';
import Loader from './loader';
import Example from './calendar';

function upload() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7'
  ];
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth)
  });

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
        .insert([{ url: publicUrl, description, date: selectedDay }])
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
              <span className="p-4 flex w-44">
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
          rows="3"
        />
      </span>
      <span className="w-full">
        <div className="bg-[#18181B] rounded-lg p-8">
          <div className="flex flex-col">
            <h2 className="flex-auto font-semibold text-white lowercase">
              {format(firstDayCurrentMonth, 'MMMM yyyy')}
            </h2>
            <time
              className="text-white font-bold lowercase"
              dateTime={format(selectedDay, 'yyyy-MM-dd')}
            >
              selected: {format(selectedDay, 'MMM dd, yyy')}
            </time>
          </div>
          <div className="grid grid-cols-7 mt-2 text-xs leading-6 font-bold text-center text-[#C7264D]">
            <div>s</div>
            <div>m</div>
            <div>t</div>
            <div>w</div>
            <div>t</div>
            <div>f</div>
            <div>s</div>
          </div>
          <div className="grid grid-cols-7 mt-2 text-sm">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  ''
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={classNames(
                    isEqual(day, selectedDay) && 'text-white',
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      'text-[#C7264D]',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      'text-white',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-400',
                    isEqual(day, selectedDay) && isToday(day) && 'bg-[#C7264D]',
                    isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      'bg-[#C7264D]',
                    !isEqual(day, selectedDay) && 'hover:bg-black',
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      'font-semibold',
                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                  )}
                >
                  <time dateTime={format(day, 'yyyy-MM-dd')}>
                    {format(day, 'd')}
                  </time>
                </button>
              </div>
            ))}
          </div>
        </div>
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
