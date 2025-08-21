import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import { Navigation, Zoom } from 'swiper/modules';
import './style.css';
import ArrowLeft from '../../../assets/arrow-left.svg';
import ArrowRight from '../../../assets/arrow-right.svg';
import NewsSwiperCard from '@/components/shared/newsSwiperCard';

// Basit modal component
const ImageModal = ({ src, onClose }) => {
  if (!src) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        cursor: 'pointer'
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

export default function NewsSwiper({ images = [] }) {
  const [zoomedImage, setZoomedImage] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!images || images.length === 0) return null;

  const showNavigation = images.length > 3; // 3’ten fazla ise buttonlar gözüksün

  const getFullImageUrl = (img) =>
    img.startsWith('http')
      ? img
      : `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`;

  return (
    <div className="news-swiper container max-w-screen-xl mx-auto my-10 px-3 relative">
      {showNavigation && (
        <>
          <div ref={prevRef} className="swiper-button-prev-cert custom-swiper-button hidden sm:flex">
            <ArrowLeft />
          </div>
          <div ref={nextRef} className="swiper-button-next-cert custom-swiper-button hidden sm:flex">
            <ArrowRight />
          </div>
        </>
      )}

      <Swiper
        slidesPerView={3}
        spaceBetween={0}
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
          360: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
      >
        {images.map((img, index) => {
          const imageUrl = getFullImageUrl(img);
          return (
            <SwiperSlide className="font-worksans" key={index}>
              <div
                className="cursor-pointer swiper-zoom-container"
                onClick={() => setZoomedImage(imageUrl)}
              >
                <NewsSwiperCard className="news-card-image" ImageSrc={imageUrl} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Zoom modal */}
      {zoomedImage && (
        <ImageModal src={zoomedImage} onClose={() => setZoomedImage(null)} />
      )}
    </div>
  );
}
