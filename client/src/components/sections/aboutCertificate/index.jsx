// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation'; 
// import {Navigation } from 'swiper/modules'; 
// import { useQuery } from '@tanstack/react-query';
// import { QueryKeys } from '../../../constants/QueryKeys';
// import { getAPiData } from '../../../http/api'; 
// import './aboutcertificate.css'; 
// import ArrowLeft from '../../../assets/arrow-left.svg';
// import ArrowRight from '../../../assets/arrow-right.svg';
// import CertificateSwiperCard from '@/components/shared/aboutCertificateCard';
// import clsx from 'clsx';
// import styles from './style.module.scss'



// export default function AboutCertificate() {
//   const { data:certificate, isLoading:certificateLoading, isError, error } = useQuery({
//     queryKey: [QueryKeys.CERTIFICATES],
//     queryFn: async () => await getAPiData('/v1/certificates/getAll')
//   });
//   console.log(certificate)

//   // const certificates = certificate?.certificates

//   if (certificateLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error: {error.message}</p>;

//   return (
//     <div className="about-certificate-swiper container max-w-screen-xl mx-auto my-10 px-3 relative"> 
//     <h1 className={clsx(styles.history, "text-center mb-6")}>Sertifikatlar</h1>
//     <div className="swiper-button-prev-cert custom-swiper-button">
//       <ArrowLeft />
//     </div>
//     <Swiper
//       slidesPerView={3}
//       spaceBetween={0}
//       pagination={{ clickable: true }}
//       navigation={{
//         nextEl: '.swiper-button-next-cert',
//         prevEl: '.swiper-button-prev-cert',
//       }}
//       modules={[Navigation]}
//       className="about-swiper"
//       breakpoints={{
//         340: {
//           slidesPerView: 1,
//         },
//         768: {
//           slidesPerView: 2,
//         },
//         1024: {
//           slidesPerView: 3,
//         },
//       }}
//     >
//       {/* {certificate?.map((el, index) => (
//         <SwiperSlide className="font-worksans" key={index}>
//           <CertificateSwiperCard ImageSrc={el.image?.url} />
//         </SwiperSlide>
//       ))} */}
//       {certificate?.map((el, index) => {
//                   const imageUrl = el.image
//                     ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${el.image}`
//                     : 'https://via.placeholder.com/150';
                
//                   return (
//                     <SwiperSlide className="font-worksans" key={index}>
//                       <CertificateSwiperCard 
//                         ImageSrc={imageUrl} 
//                       />
//                     </SwiperSlide>
//                   );
//                 })}
//     </Swiper>
//     <div className="swiper-button-next-cert custom-swiper-button">
//       <ArrowRight />
//     </div>
//   </div>
  
  
//   );
// }
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import { Navigation } from 'swiper/modules'; 
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../../constants/QueryKeys';
import { getAPiData } from '../../../http/api'; 
import './aboutcertificate.css'; 
import ArrowLeft from '../../../assets/arrow-left.svg';
import ArrowRight from '../../../assets/arrow-right.svg';
import CertificateSwiperCard from '@/components/shared/aboutCertificateCard';
import clsx from 'clsx';
import styles from './style.module.scss';
import CertificateModal from '../certificateModal';

export default function AboutCertificate() {
  const { data: certificate, isLoading: certificateLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.CERTIFICATES],
    queryFn: async () => await getAPiData('/v1/certificates/getAll')
  });

  const [selectedCert, setSelectedCert] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [navigationReady, setNavigationReady] = useState(false);

  const slidesDesktop = 3;
  const showNavigation = certificate && certificate.length > slidesDesktop;

  useEffect(() => {
    if (showNavigation && prevRef.current && nextRef.current) {
      setNavigationReady(true);
    }
  }, [certificate, showNavigation]);

  if (certificateLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleOpenModal = (cert) => setSelectedCert(cert);
  const handleCloseModal = () => setSelectedCert(null);

  return (
    <div className="about-certificate-swiper container max-w-screen-xl mx-auto my-10 px-3 relative"> 
      <h1 className={clsx(styles.history, "text-center mb-6")}>Sertifikatlar</h1>

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
        slidesPerView={slidesDesktop}
        spaceBetween={0}
        pagination={{ clickable: true }}
        navigation={navigationReady ? { prevEl: prevRef.current, nextEl: nextRef.current } : false}
        modules={[Navigation]}
        className="about-swiper"
        breakpoints={{
          340: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: slidesDesktop },
        }}
      >
        {certificate?.map((el, index) => {
          const imageUrl = el.image
            ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${el.image}`
            : 'https://via.placeholder.com/150';

          return (
            <SwiperSlide className="font-worksans" key={index}>
              <div onClick={() => handleOpenModal(el)} style={{ cursor: 'pointer' }}>
                <CertificateSwiperCard ImageSrc={imageUrl} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Modal */}
      {selectedCert && <CertificateModal data={selectedCert} onClose={handleCloseModal} />}
    </div>
  );
}

