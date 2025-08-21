// import React from 'react'
// import { useParams } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import { getAPiData } from '@/http/api'
// import clsx from 'clsx'
// import styles from './style.module.scss'
// const SpecialProjectsTemplates = () => {
//   const { id } = useParams()

//   const {
//     data: allProjects,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ['all-projects'],
//     queryFn: async () => await getAPiData(`/specials/${id}`), 
//   })

//   if (isLoading) return <p>Loading...</p>
//   if (isError) return <p>Error: {error.message}</p>

//   const project = allProjects.find((p) => String(p.id) === id)

//   if (!project) return <p>Project not found.</p>

//   const name = project.name || 'No name'


//   return (
//     <div className="container mx-auto my-20 px-4 max-w-screen-xl">
//          <div className='py-7'>
//         <div className='flex gap-6 py-6'>
//               <h1 className={clsx(styles.detailname)}> {name}</h1>
//               </div>
//       <div className='flex justify-start gap-6 py-6'>
//       <div className={clsx(styles.detname)}>
//   {project.context
//     ? project.context.split('\n\n').map((paragraph, idx) => (
//         <p key={idx} className="mb-4">{paragraph}</p>
//       ))
//     : <p className="text-gray-500">Məlumat mövcud deyil.</p>
//   }
// </div>
// </div>
//      </div>
//      <div className='grid grid-cols-1'>
//      {project.specialimages?.length > 0 && (
//   <div className={clsx(styles.imagebox)}>
//     {project.specialimages.map((img, idx) => {
//       const fullUrl = img.url.startsWith('http')
//         ? img.url
//         : `${import.meta.env.VITE_API_BASE_URL}${img.url}`

//       return (
//         <img
//           key={idx}
//           className={clsx(styles.projectimg)}
//           src={fullUrl}
//           alt={`Office Image ${idx + 1}`}
//         />
//       )
//     })}
//   </div>
// )}


//      </div>
//     </div>
//   )
// }

// export default SpecialProjectsTemplates

///222

// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { getAPiData } from '@/http/api';
// import clsx from 'clsx';
// import styles from './style.module.scss';

// const SpecialProjectsTemplates = () => {
//   const { slug } = useParams();

//   const {
//     data: project,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ['special-project', slug],
//     queryFn: () => getAPiData(`/v1/specials/slug/${slug}`),
//     enabled: !!slug,
//   });
//   console.log("slug:", slug);
// console.log("project:", project);


//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error: {error.message}</p>;
//   if (!project) return <p>Project not found.</p>;

//   const name = project.name || 'No name';

//   return (
//     <div className="container mx-auto my-20 px-4 max-w-screen-xl">
//       <div className="py-7">
//         <div className="flex gap-6 py-6">
//           <h1 className={clsx(styles.detailname)}>{name}</h1>
//         </div>

//         <div className="flex justify-start gap-6 py-6">
//         <div className={clsx(styles.detname)}>
//       {project.content ? (
//         <div
//           dangerouslySetInnerHTML={{ __html: project.content }}
//         />
//       ) : (
//         <p className="text-gray-500">Məlumat mövcud deyil.</p>
//       )}
//     </div>
//         </div>
//       </div>

//       {project.images?.length > 0 && (
//         <div className={clsx(styles.imagebox)}>
//           {project.images.map((filename, idx) => {
//             const fullUrl = `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${filename}`;
//             return (
//               <img
//                 key={idx}
//                 className={clsx(styles.projectimg)}
//                 src={fullUrl}
//                 alt={`Image ${idx + 1}`}
//               />
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SpecialProjectsTemplates;
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAPiData } from '@/http/api';
import clsx from 'clsx';
import './style.css'
import styles from './style.module.scss';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import ArrowLeft from '@/assets/arrow-left.svg';
import ArrowRight from '@/assets/arrow-right.svg';
import NewsSwiperCard from '@/components/shared/newsSwiperCard';
import { Helmet } from 'react-helmet-async';

const SpecialProjectsTemplates = () => {
  const { slug } = useParams();

  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['special-project', slug],
    queryFn: () => getAPiData(`/v1/specials/getBySlug/${slug}`),
    enabled: !!slug,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!project) return <p>Project not found.</p>;

  const name = project.name || 'No name';

  return (
    <>
     <Helmet>
                <title>{name} | News | Rrgroup</title>
                <meta name="description" content={context.slice(0, 150)} />
                <meta property="og:title" content={name} />
                <meta property="og:description" content={context.slice(0, 150)} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:type" content="article" />
              </Helmet>
              <div className="container mx-auto my-20 px-4 max-w-screen-xl">
      <div className="py-7">
        <div className="flex gap-6 py-6">
          <h1 className={clsx(styles.detailname)}>{name}</h1>
        </div>

        <div className="flex justify-start gap-6 py-6">
          <div className={clsx(styles.detname)}>
            {project.content ? (
              <div
              className='ql-editor'
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            ) : (
              <p className="text-gray-500">Məlumat mövcud deyil.</p>
            )}
          </div>
        </div>
      </div>

      {project.images?.length > 0 && (
          <div className="about-certificate-swiper container max-w-screen-xl mx-auto my-10 px-3 relative"> 
          <div className="swiper-button-prev-cert custom-swiper-button hidden sm:flex">
            <ArrowLeft />
          </div>
          <Swiper
            slidesPerView={3}
            spaceBetween={0}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: '.swiper-button-next-cert',
              prevEl: '.swiper-button-prev-cert',
            }}
            breakpoints={{
              360: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
            modules={[Navigation]}
            className="about-swiper"
          >
                    {project.images.map((filename, index) => {
            const imageUrl = filename
                ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${filename}`
                : 'https://via.placeholder.com/300';

            return (
                <SwiperSlide className="font-worksans" key={index}>
                <NewsSwiperCard ImageSrc={imageUrl} />
                </SwiperSlide>
            );
            })}

          </Swiper>
          <div className="swiper-button-next-cert custom-swiper-button hidden sm:flex">
            <ArrowRight />
          </div>
        </div>
      )}
    </div>
    </>
    
  );
};

export default SpecialProjectsTemplates;
