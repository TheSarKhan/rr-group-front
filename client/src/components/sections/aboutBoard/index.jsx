import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/constants/QueryKeys';
import { getAPiData } from '@/http/api';
import clsx from 'clsx';
import styles from './style.module.scss';
import './style.css';
import AboutModal from '../aboutModal';

const AboutBoard = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: boardData, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.ABOUTBOARDS],
    queryFn: async () => await getAPiData('/v1/team/getAll')
  });

  // const manageTeams = boardData?.manageTeams

  const openModal = (board) => {
    setSelectedBoard(board);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBoard(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto my-10">
      <div className='flex text-center justify-center my-5 mx-auto'>
        <h1 className={clsx(styles.mission)}>İdarə heyəti</h1>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
      {boardData?.map((board) => {
  const { id, image, title,work } = board;

  const imageUrl = image
    ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${image}`
    : 'https://via.placeholder.com/150';

  return (
    <div
      key={id}
       className="w-[400px] min-h-[420px] bg-[#EBEBEB] rounded-lg flex flex-col justify-between"
    >
      <div className="p-3">
        <img
          className="w-full object-cover h-[260px]"
          src={imageUrl}
          alt={title}
        />
      </div>
      <div className="p-2 text-center">
        <h5 className="mb-3 text-[20px] font-[500] text-black">{title}</h5>
        <h5 className="mb-2 text-[20px] font-[500] text-black">{work}</h5>
        <button
          onClick={() => openModal(board)}
          className="inline-flex items-center cursor-pointer my-5 px-6 py-2 text-sm font-medium text-white bg-[#444B73] rounded-lg hover:bg-[#363c5e]"
        >
          Ətraflı
        </button>
      </div>
    </div>
  );
})}

      </div>

      {isModalOpen && (
        <AboutModal data={selectedBoard} onClose={closeModal} />
      )}
    </div>
  );
};

export default AboutBoard;
