import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import { Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../../constants/QueryKeys';
import { getAPiData } from '../../../http/api'; 
import './style.css'; 
import NewsCard from '@/components/shared/newsCard';
import clsx from 'clsx';
import styles from './style.module.scss'
import ArrowLeft from '../../../assets/arrow-left.svg';
import ArrowRight from '../../../assets/arrow-right.svg';

export default function HomeNews() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.NEWSCARDS],
    queryFn: async () => await getAPiData('/v1/news/get10News')
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const news = Array.isArray(data) ? data : data?.news;

  if (!news || news.length === 0) return <p>Heç bir xəbər tapılmadı.</p>;

  return (
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
      <h1 className={clsx(styles.mission)}>Xəbərlər</h1>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev custom-swiper-button">
        <ArrowLeft />
      </div>
      <div className="swiper-button-next custom-swiper-button">
        <ArrowRight />
      </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        grabCursor={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          340: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {news.map((el, index) => (
          <SwiperSlide className="font-worksans" key={index}>
            <NewsCard news={el} icon={el.images?.[0]} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
