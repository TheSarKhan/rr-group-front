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
import InstaSwiperCard from '../../shared/InstaSwiperCard';
import ArrowLeft from '../../../assets/arrow-left.svg';
import ArrowRight from '../../../assets/arrow-right.svg';
import clsx from 'clsx';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';

export default function ServiceOffices() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.SERVICEOFFICES],
    queryFn: async () => await getAPiData('/v1/foreign/getAll')
  });

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const slidesDesktop = 3;
  const showNavigation = data && data.length > slidesDesktop;

  return (
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
      <div className='flex my-5 mx-auto px-4'>
        <h1 className={clsx(styles.mission)}>Xarici nümayəndəliklər</h1>
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
        slidesPerView={3}
        spaceBetween={5}
        pagination={{ clickable: true }}
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
          1024: { slidesPerView: 3 },
        }}
      >
        {data?.map((el, index) => {
          const imageUrl = el.icon
            ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${el.icon}`
            : 'https://via.placeholder.com/150';

          return (
            <SwiperSlide className="font-worksans" key={index}>
              <Link to={`/services/offices/${el.slug}`}>
                <InstaSwiperCard 
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
