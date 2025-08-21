// KsmDetailSwiper.jsx
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import { Navigation, Zoom } from 'swiper/modules';
import ArrowLeft from '../../../assets/arrow-left.svg';
import ArrowRight from '../../../assets/arrow-right.svg';
import NewsSwiperCard from '@/components/shared/newsSwiperCard';
import styled from 'styled-components';

// Modal component
const ImageModal = ({ src, onClose }) => {
  if (!src) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        cursor: 'pointer',
      }}
    >
      <img
        src={src}
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          objectFit: 'contain',
        }}
        alt="Zoomed"
      />
    </div>
  );
};

// Styled component ile aynı boyutta ve düzgün aralıklı container
const SlideContainer = styled.div`
  width: 100%;
  aspect-ratio: 4/3;  /* 4:3 oranında sabit */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function KsmDetailSwiper({ images = [] }) {
  const [zoomedImage, setZoomedImage] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!images || images.length === 0) return null;

  const showNavigation = images.length > 3;

  return (
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
      {showNavigation && (
        <>
          <div ref={prevRef} className="swiper-button-prev-cert custom-swiper-button">
            <ArrowLeft />
          </div>
          <div ref={nextRef} className="swiper-button-next-cert custom-swiper-button">
            <ArrowRight />
          </div>
        </>
      )}

      <Swiper
        slidesPerView={3}
        spaceBetween={20} // slide'lar arası boşluk
        zoom={{ maxRatio: 2 }}
        navigation={showNavigation ? { prevEl: prevRef.current, nextEl: nextRef.current } : false}
        onBeforeInit={(swiper) => {
          if (showNavigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        modules={[Navigation, Zoom]}
        className="about-swiper"
        breakpoints={{
          340: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
      >
        {images.map((img, index) => {
          const imageUrl = img.startsWith('http')
            ? img
            : `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`;

          return (
            <SwiperSlide key={index}>
              <SlideContainer onClick={() => setZoomedImage(imageUrl)}>
                <NewsSwiperCard ImageSrc={imageUrl} />
              </SlideContainer>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {zoomedImage && <ImageModal src={zoomedImage} onClose={() => setZoomedImage(null)} />}
    </div>
  );
}
