// ServiceDetailSwiper.jsx
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import { Navigation, Zoom } from 'swiper/modules';
import ArrowLeft from '@/assets/arrow-left.svg';
import ArrowRight from '@/assets/arrow-right.svg';
import ServiceDetailSwiperCard from '@/components/shared/serviceDetailSwiperCard';

// Zoom modal
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

const ServiceDetailSwiper = ({ images = [] }) => {
  const [zoomedImage, setZoomedImage] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!images || images.length === 0) return <p>No images to display.</p>;

  // Minimum 3 şəkil varsa navigation göstər
  const showNavigation = images.length >= 3;

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
        slidesPerView={2}
        spaceBetween={20}
        navigation={showNavigation ? { prevEl: prevRef.current, nextEl: nextRef.current } : false}
        onBeforeInit={(swiper) => {
          if (showNavigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        zoom={{ maxRatio: 2 }}
        modules={[Navigation, Zoom]}
        breakpoints={{
          340: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 2, spaceBetween: 20 },
        }}
      >
        {images.map((filename, index) => {
          const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
          const url = `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${cleanFilename}`;
          return (
            <SwiperSlide key={index}>
              <div className="cursor-pointer swiper-zoom-container" onClick={() => setZoomedImage(url)}>
                <ServiceDetailSwiperCard ImageSrc={url} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Zoom modal */}
      {zoomedImage && <ImageModal src={zoomedImage} onClose={() => setZoomedImage(null)} />}
    </div>
  );
};

export default ServiceDetailSwiper;