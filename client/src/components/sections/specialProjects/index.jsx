import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../../constants/QueryKeys';
import { getAPiData } from '../../../http/api'; 
import './style.css'; 
import NewsCard from '@/components/shared/newsCard';
import clsx from 'clsx';
import styles from './style.module.scss'
import SpecialProjectsCard from '@/components/shared/specialProjectsCard';
export default function SpecialProjects() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.SPECIALPROJECTS],
    queryFn: async () => await getAPiData('/v1/specials/getAll')
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative"> 
    <h1 className={clsx(styles.mission)}>Özəl layihələr</h1>
      <Swiper
        slidesPerView={2}
        spaceBetween={2}
        grabCursor={true} 
        className="mySwiper"
        breakpoints={{
            340: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
      >
        {data?.map((el, index) => (
          <SwiperSlide className="font-worksans" key={index}>
            <SpecialProjectsCard news={el} />

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
