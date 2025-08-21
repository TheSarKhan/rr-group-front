// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { useQuery } from '@tanstack/react-query';
// import { QueryKeys } from '../../../constants/QueryKeys';
// import { getAPiData } from '../../../http/api'; 
// import './style.css'; 
// import ProjectSwiperCard from '@/components/shared/projectSwiperCard';
// import { Link } from 'react-router-dom';

// export default function ServiceConstructSwiper() {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: [QueryKeys.SERVICES],
//     queryFn: async () => await getAPiData('services')
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error: {error.message}</p>;

//   return (
//     <div className="container max-w-screen-xl mx-auto my-10 px-3 relative"> 
//       <Swiper
//         slidesPerView={2}
//         spaceBetween={10}
//         grabCursor={true} 
//         className="mySwiper"
//         breakpoints={{
//           340: {
//             slidesPerView: 1,
//           },
//           768: {
//             slidesPerView: 1,
//           },
//           1024: {
//             slidesPerView: 2,
//           },
//         }}
//       >
//         {data?.map((el, index) => (
//           <SwiperSlide className="font-worksans" key={index}>
//             <Link to={`/rrgroup/services/${el.id}`}>
//             <ProjectSwiperCard
//               ImageSrc={el.image?.url} 
//               name={el.name}
//               desc={el.desc}
//             />
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }







// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import './style.css'; 
// import ProjectSwiperCard from '@/components/shared/projectSwiperCard';
// import { Link } from 'react-router-dom';

// export default function ServiceConstructSwiper({ data }) {
//   return (
//     <div className="container max-w-screen-xl mx-auto my-10 px-3 relative"> 
//       <Swiper
//         slidesPerView={2}
//         spaceBetween={20}
//         grabCursor={true}
//         breakpoints={{
//           340: { slidesPerView: 1 },
//           768: { slidesPerView: 1 },
//           1024: { slidesPerView: 2 },
//         }}
//       >
//         {data?.map((el, index) => (
//           <SwiperSlide key={index}>
//             <Link to={`/services/${el.slug}`}>
//               <ProjectSwiperCard
//                 ImageSrc={`${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${el.content?.mainImage}`}
//                 name={el.header}
//                 desc={el.description}
//               />
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import { Navigation } from 'swiper/modules'; 
import ProjectSwiperCard from '@/components/shared/projectSwiperCard';
import { Link } from 'react-router-dom';
import './style.css'; 
import ArrowLeft from '../../../assets/arrow-left.svg';
import ArrowRight from '../../../assets/arrow-right.svg';

export default function ServiceConstructSwiper({ data }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const slidesDesktop = 2;
  const showNavigation = data && data.length > slidesDesktop;

  // --- Burada key ekliyoruz: data.length değişirse Swiper resetlenecek ---
  return (
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
      {showNavigation && (
        <>
          <div ref={prevRef} className="swiper-button-prev custom-swiper-button">
            <ArrowLeft/>
          </div>
          <div ref={nextRef} className="swiper-button-next custom-swiper-button">
            <ArrowRight/>
          </div>
        </>
      )}

      <Swiper
        key={data?.length} // <= Burada
        slidesPerView={2}
        spaceBetween={20}
        grabCursor={true}
        navigation={showNavigation ? { prevEl: prevRef.current, nextEl: nextRef.current } : false}
        onBeforeInit={(swiper) => {
          if (showNavigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        modules={[Navigation]}
        breakpoints={{
          340: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }}
      >
        {data?.map((el, index) => {
          const imageUrl = el.content?.mainImage
            ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${el.content.mainImage}`
            : 'https://via.placeholder.com/300';

          return (
            <SwiperSlide key={index}>
              <Link to={`/services/${el.slug}`}>
                <ProjectSwiperCard
                  ImageSrc={imageUrl}
                  name={el.header}
                  desc={el.description}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
