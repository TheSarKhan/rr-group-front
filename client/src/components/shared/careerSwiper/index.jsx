import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import { Navigation } from 'swiper/modules'; 
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../../constants/QueryKeys';
import { getAPiData } from '../../../http/api'; 
import './style.css'; 
import ArrowLeft from '../../../assets/arrow-left.svg';
import ArrowRight from '../../../assets/arrow-right.svg';
import clsx from 'clsx';
import styles from './style.module.scss'
import { Link } from 'react-router-dom';
import CareerSwiperCard from '../careerSwiperCard';

export default function CareerSwiper() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.CAREERSWIPER],
    queryFn: async () => await getAPiData('/v1/vacancy/getAll')
  });

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const slidesDesktop = 3;

  const showNavigation = data && data.length > slidesDesktop;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = String(date.getFullYear()).slice(-2); 
    return `${day}.${month}.${year}`;
  }

  return (
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative"> 
      <div className='flex my-5 mx-auto px-4'>
        <h1 className={clsx(styles.mission)}>Aktiv vakansiyalar</h1>
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
          768: { slidesPerView: 2 },
          1024: { slidesPerView: slidesDesktop },
        }}
      >
        {data?.map((item, index) => {
          const imageUrl = item.image
            ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.image}`
            : 'https://via.placeholder.com/150';

          return (
            <SwiperSlide className="font-worksans" key={index}>
              <Link to={`/career/${item.slug}`}>
                <CareerSwiperCard
                  ImageSrc={imageUrl}
                  name={item.title}
                  desc={formatDate(item.createdAt)}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
