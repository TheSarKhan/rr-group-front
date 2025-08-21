import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import { Navigation } from 'swiper/modules'; 
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../../constants/QueryKeys';
import { getAPiData } from '../../../http/api'; 
import './style.css'; 
import InstaSwiperCard from '../../shared/InstaSwiperCard';
import ArrowLeft from '../../../assets/arrow-left.svg';
import ArrowRight from '../../../assets/arrow-right.svg';
import clsx from 'clsx';
import styles from './style.module.scss';

export default function InstaSwiper() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.INSTASWIPERS],
    queryFn: async () => await getAPiData('/v1/missions/getAll')
  });

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [navigationReady, setNavigationReady] = useState(false);

  const slidesDesktop = 3;
  const showNavigation = data && data.length > slidesDesktop;

  useEffect(() => {
    if (showNavigation && prevRef.current && nextRef.current) {
      setNavigationReady(true);
    }
  }, [data, showNavigation]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative"> 
      <div className='flex text-center justify-center my-5 mx-auto'>
        <h1 className={clsx(styles.mission)}>Missiyamız</h1>
      </div>

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
        slidesPerView={slidesDesktop}
        spaceBetween={5}
        grabCursor={true}
        navigation={navigationReady ? { prevEl: prevRef.current, nextEl: nextRef.current } : false}
        modules={[Navigation]}
        breakpoints={{
          340: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: slidesDesktop },
        }}
      >
        {data?.map((el, index) => {
          const imageUrl = el.icon
            ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${el.icon}`
            : 'https://via.placeholder.com/150';

          return (
            <SwiperSlide className="font-worksans" key={index}>
              <InstaSwiperCard 
                ImageSrc={imageUrl} 
                name={el.title}
                desc={el.description}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
