import React from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';

const AboutModal = ({ data, onClose }) => {
  if (!data) return null;

  const imageUrl = data?.image
  ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${data.image}`
  : 'https://via.placeholder.com/150';



  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-x-hidden">
      <div className="bg-[#F7F6F6] rounded-sm shadow-lg relative w-full max-w-[734px] max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <div className="relative flex justify-center px-4 py-4">
          <img
            className={clsx(styles.modalimg, 'max-w-full h-auto object-contain')}
            src={imageUrl}
            alt={data.name}
          />
          <button
            onClick={onClose}
            className={clsx(styles.closebtn, 'absolute -top-4 right-2 text-3xl leading-none')}
          >
            +
          </button>
        </div>

        <div className="p-4 text-center">
          <h3 className="text-lg md:text-xl font-semibold mb-2">{data.title}</h3>
          <h3 className="text-lg md:text-xl font-semibold mb-2">{data.work}</h3>
          <div
  className={clsx(styles.modaldesc, 'text-sm md:text-base break-words ql-editor')}
  dangerouslySetInnerHTML={{ __html: data.paragraph }}
/>

        </div>
      </div>
    </div>
  );
};

export default AboutModal;
