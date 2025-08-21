import React from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';

const CertificateModal = ({ data, onClose }) => {
  if (!data) return null;

  const imageUrl = data?.image
    ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${data.image}`
    : 'https://via.placeholder.com/150';

  return (
    <div
      className="fixed inset-0 bg-transparent flex justify-center items-center z-50 px-4"
      onClick={onClose} // close when clicking outside image
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} // subtle dark overlay
    >
      <img
        className={clsx(styles.modalimg, 'max-w-full max-h-[90vh] object-contain')}
        src={imageUrl}
        alt={data.name}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
        style={{ cursor: 'zoom-out' }} // hint user can click to close
      />
    </div>
  );
};

export default CertificateModal;
