// import React from 'react';
// import styles from './styles.module.scss'
// import clsx from 'clsx';
// const HomeProjects = () => {
    
//   return (
//     <div className="container max-w-screen-xl mx-auto my-20 px-3 space-y-6">
//          <h1 className={clsx(styles.aboutus)}>Layihələr</h1>
//       <div>
//         <img
//           className="w-full h-[300px] object-cover"
//           src={`${import.meta.env.BASE_URL}assets/proj1.svg`}
//           alt="Project 1"
//         />
//       </div>

//       <div className="grid grid-cols-12 gap-4">
//         <div className="col-span-4">
//           <img
//             className="w-full h-[300px] object-cover"
//             src={`${import.meta.env.BASE_URL}assets/proj2.svg`}
//             alt="Project 2"
//           />
//         </div>
//         <div className="col-span-8 grid grid-cols-12 gap-4">
//           <div className="col-span-7">
//             <img
//               className="w-full h-[300px] object-cover"
//               src={`${import.meta.env.BASE_URL}assets/proj3.svg`}
//               alt="Project 3"
//             />
//           </div>
//           <div className="col-span-5">
//             <img
//               className="w-full h-[300px] object-cover"
//               src={`${import.meta.env.BASE_URL}assets/proj6.svg`}
//               alt="Project 6"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-12 gap-4">
//         <div className="col-span-6">
//           <img
//             className="w-full h-[300px] object-cover"
//             src={`${import.meta.env.BASE_URL}assets/proj4.svg`}
//             alt="Project 4"
//           />
//         </div>
//         <div className="col-span-6">
//           <img
//             className="w-full h-[300px] object-cover"
//             src={`${import.meta.env.BASE_URL}assets/proj5.svg`}
//             alt="Project 5"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeProjects;

import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { getAPiData } from '../../../http/api';
import { Link } from 'react-router-dom';

const monthsAz = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'
];
const formatDate = (iso) => {
  const date = new Date(iso);
  const day = date.getDate().toString().padStart(2, '0');
  const month = monthsAz[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const HomeProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAPiData('/v1/projects/getAll')
      .then((data) => setProjects(data || []))
      .catch((err) => console.error('Project fetch failed:', err));
  }, []);

  // const getImage = (item, fallback) => {
  //   return item.images?.[0]
  //     ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.images[0]}`
  //     : fallback;
  // };

  return (
    <div className="container max-w-screen-xl mx-auto my-20 px-3 space-y-6">
      <h1 className={clsx(styles.aboutus)}>Layihələr</h1>

      {/* First full-width image */}
      {projects[0] && (
        <ProjectImage item={projects[0]} fallback="assets/proj1.svg" />
      )}

      {/* Second block: Left 1 / Right 2 */}
      <div className="grid grid-cols-12 gap-4">
        {projects[1] && (
          <div className="col-span-4">
            <ProjectImage item={projects[1]} fallback="assets/proj2.svg" />
          </div>
        )}
        <div className="col-span-8 grid grid-cols-12 gap-4">
          {projects[2] && (
            <div className="col-span-7">
              <ProjectImage item={projects[2]} fallback="assets/proj3.svg" />
            </div>
          )}
          {projects[3] && (
            <div className="col-span-5">
              <ProjectImage item={projects[3]} fallback="assets/proj6.svg" />
            </div>
          )}
        </div>
      </div>

      {/* Last row: 2 equal columns */}
      <div className="grid grid-cols-12 gap-4">
        {projects[4] && (
          <div className="col-span-6">
            <ProjectImage item={projects[4]} fallback="assets/proj4.svg" />
          </div>
        )}
        {projects[5] && (
          <div className="col-span-6">
            <ProjectImage item={projects[5]} fallback="assets/proj5.svg" />
          </div>
        )}

      </div>
  <div className="flex justify-center items-center mt-10">
    <Link
      to="/projects"
      className=" text-black py-2 px-6 rounded cursor-pointer text-xl"
    >
      Hamısına bax
    </Link>
  </div>
    </div>
  );
};

const ProjectImage = ({ item, fallback }) => {
  const imageUrl = item.images?.[0]
    ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.images[0]}`
    : `${import.meta.env.BASE_URL}${fallback}`;

  return (
    <Link to={`/projects/${item.slug}`} className="block">
    <div className="relative group w-full h-[300px] overflow-hidden">
      <img
        src={imageUrl}
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-between p-4 text-white">
        <div className="text-right text-sm">{formatDate(item.constructDate)}</div>
        <div className="text-left text-lg font-semibold">{item.name}</div>
      </div>
    </div>
    </Link>
  );
};

export default HomeProjects;
