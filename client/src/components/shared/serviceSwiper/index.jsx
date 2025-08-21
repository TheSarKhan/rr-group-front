 
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';
import ServiceSwiperCard from '../serviceSwiperCard';

 

export default function ServiceSwiper({ data, onSubCategoryClick, selectedSlug }) {
  return (
    <div className="container max-w-screen-xl mx-auto my-10 px-1 relative"> 
      <Swiper
        slidesPerView={3}
        spaceBetween={5}
        grabCursor={true}
        className="mySwiper"
        breakpoints={{
          340: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        }}
      >
        {data?.map((el, index) => (
          <SwiperSlide key={index}>
            <div onClick={() => onSubCategoryClick(el.slug)}>
              <ServiceSwiperCard
                desc={el.name}
                isActive={selectedSlug === el.slug}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

