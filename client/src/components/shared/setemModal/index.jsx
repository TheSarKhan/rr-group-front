import React from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';

const SetemModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4"
      onClick={onClose} // close when clicking outside modal content
    >
      <div
        className={clsx(
            'bg-white rounded-md shadow-lg max-w-lg w-full p-6',
            styles.modalcontent
          )}
          style={{ width: '400px', height: '400px', overflowY: 'auto' }}
          onClick={e => e.stopPropagation()}
        >
        <h3 className="text-xl font-semibold mb-4">{data.title || data.header}</h3>
        <div
          className={clsx(styles.modaldesc, 'ql-editor')}
          dangerouslySetInnerHTML={{ __html: data.content || data.description }}
        />
      </div>
    </div>
  );
};

export default SetemModal;
