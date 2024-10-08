import React, { useState } from 'react';
import Gallery from '../component/gallery';
import Upload from '../component/upload';
import Juiliana from '../../public/juliana.jpeg';
import Manuel from '../../public/manuel.jpeg';
import Modal from '../component/modal';

function home() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="px-8 lg:px-56 py-20">
        <div className="py-10">
          <span className="font-bold text-3xl text-white">
            our memories 🫂💗
          </span>
          <p className="text-white">
            A beautiful moment frozen in time, a memory that will last forever.
          </p>
          <article className="flex flex-row items-center justify-between">
            <section className="flex flex-row gap-4 py-4 items-center">
              <span className="rounded-full border-2 p-0.5 border-green-600">
                <img
                  src={Manuel}
                  alt="Manuel"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </span>
              <span className="font-bold text-[#F92F60]">X</span>
              <span className="rounded-full border-2 p-0.5 border-green-600">
                <img
                  src={Juiliana}
                  alt="Juiliana"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </span>
            </section>
            <section>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="text-white font-bold underline text-xs"
              >
                add memory
              </button>
            </section>
          </article>
        </div>

        <Gallery />
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Upload />
      </Modal>
      {/* <Created /> */}
    </div>
  );
}

export default home;
