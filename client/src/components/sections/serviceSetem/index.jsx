// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { QueryKeys } from '@/constants/QueryKeys';
// import { getAPiData } from '@/http/api';
// import './style.css';
// import AboutModal from '../aboutModal';
// import clsx from 'clsx';
// import styles from './style.module.scss'

// const ServiceSetem = () => {
//   const [selectedBoard, setSelectedBoard] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data: boardData, isLoading, isError, error } = useQuery({
//     queryKey: [QueryKeys.SERVICESETEMS],
//     queryFn: async () => await getAPiData('/v1/setem/getAll')
//   });

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedBoard(null);
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error: {error.message}</p>;

//   return (
//     <div className="container max-w-screen-xl mx-auto my-10">
//       <div className='flex flex-col justify-start my-10 mx-auto'>
//         <h1 className={clsx(styles.setemtitle)}>SƏTƏM</h1>
//         <p className={clsx(styles.setemfirstdesc)}>Sağlamlıq, Əməyin Təhlükəsizliyi və Ətraf Mühit</p>
//       </div>

//       <div className="flex flex-wrap gap-6 justify-center">
//         {boardData?.map((board) => {
//           const { id, icon, header, description} = board;
//           const imageUrl = icon
//                 ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${icon}`
//                 : 'https://via.placeholder.com/150';
//                 console.log('Image URL:', imageUrl);

//           return (
//             <div
//               key={id}
//               className={clsx(styles.setemcard)}
//             >
//               <div className={clsx(styles.setemimg)}>
//                 <img
//                   className="w-full object-cover h-[260px]"
//                   src={imageUrl}
//                   alt={header}
//                 />
//               </div>
//               <div className="p-2 text-center">
//                 <h5 className={clsx(styles.setemname)}>{header}</h5>
//               </div>
//               <div className="p-2 text-center">
//                 <p className={clsx(styles.setemdesc)}>{description}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {isModalOpen && (
//         <AboutModal data={selectedBoard} onClose={closeModal} />
//       )}
//     </div>
//   );
// };

// export default ServiceSetem;
// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { QueryKeys } from '@/constants/QueryKeys';
// import { getAPiData } from '@/http/api';
// import './style.css';
// import AboutModal from '../aboutModal';
// import clsx from 'clsx';
// import styles from './style.module.scss';
// import SetemModal from '@/components/shared/setemModal';

// const ServiceSetem = () => {
//   const [selectedBoard, setSelectedBoard] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data: boardData, isLoading, isError, error } = useQuery({
//     queryKey: [QueryKeys.SERVICESETEMS],
//     queryFn: async () => await getAPiData('/v1/setem/getAll')
//   });

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedBoard(null);
//   };

//   const handleOpenModal = (board) => {
//     setSelectedBoard(board);
//     setIsModalOpen(true);
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error: {error.message}</p>;

//   return (
//     <div className="container max-w-screen-xl mx-auto my-10">
//       <div className="flex flex-col justify-start my-10 mx-auto">
//         <h1 className={clsx(styles.setemtitle)}>SƏTƏM</h1>
//         <p className={clsx(styles.setemfirstdesc)}>Sağlamlıq, Əməyin Təhlükəsizliyi və Ətraf Mühit</p>
//       </div>

//       <div className="flex flex-wrap gap-6 justify-center">
//         {boardData?.map((board) => {
//           const { id, icon, header, description } = board;
//           const imageUrl = icon
//             ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${icon}`
//             : 'https://via.placeholder.com/150';

//           return (
//             <div
//               key={id}
//               className={clsx(styles.setemcard, 'cursor-pointer')}
//               onClick={() => handleOpenModal(board)}
//             >
//               <div className={clsx(styles.setemimg)}>
//                 <img
//                   className="w-full object-cover h-[260px]"
//                   src={imageUrl}
//                   alt={header}
//                 />
//               </div>
//               <div className="p-2 text-center">
//                 <h5 className={clsx(styles.setemname)}>{header}</h5>
//               </div>
//               <div className="p-2 text-center">
//                 <p className={clsx(styles.setemdesc)}>{description}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {isModalOpen && (
//         <SetemModal data={selectedBoard} onClose={closeModal} />
//       )}
//     </div>
//   );
// };

// export default ServiceSetem;
