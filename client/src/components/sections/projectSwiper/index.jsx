import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../../constants/QueryKeys';
import { getAPiData } from '../../../http/api'; 
import './style.css'; 
import clsx from 'clsx';
import styles from './style.module.scss'
import ProjectSwiperCard from '@/components/shared/projectSwiperCard';
import { Link } from 'react-router-dom';
import ArrowLeft from '../../../assets/arrow-left.svg';
import ArrowRight from '../../../assets/arrow-right.svg';

export default function ProjectSwiper() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.PROJECTCARDS],
    queryFn: async () => await getAPiData(`/v1/projects/getAll`)
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Verileri karıştır
  const shuffledData = data ? [...data].sort(() => Math.random() - 0.5) : [];

  return (
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative"> 
      <div className='flex text-start justify-start my-5 mx-auto'>
        <h1 className={clsx(styles.values)}>Digər layihələr</h1>
      </div>

      <div className="swiper-button-prev-cert custom-swiper-button">
        <ArrowLeft />
      </div>
      <div className="swiper-button-next-cert custom-swiper-button">
        <ArrowRight />
      </div>

      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        navigation={{
          nextEl: '.swiper-button-next-cert',
          prevEl: '.swiper-button-prev-cert',
        }}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          340: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 1, spaceBetween: 15 },
          1024: { slidesPerView: 2, spaceBetween: 20 },
        }}
      >
        {shuffledData?.map((el, index) => {
          const firstImage = el.images?.[0];
          const imageUrl = firstImage
            ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${firstImage}`
            : 'https://via.placeholder.com/300';

          return (
            <SwiperSlide className="font-worksans" key={index}>
              <Link to={`/projects/${el.slug}`}>
                <ProjectSwiperCard
                  ImageSrc={imageUrl}
                  name={el.name}
                  desc={el.content}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
