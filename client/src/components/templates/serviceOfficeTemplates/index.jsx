// ServiceOfficeTemplates.jsx
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAPiData } from '@/http/api';
import clsx from 'clsx';
import styles from './style.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import { Navigation, Zoom } from 'swiper/modules';
import { Helmet } from 'react-helmet-async';
import ArrowLeft from '@/assets/arrow-left.svg';
import ArrowRight from '@/assets/arrow-right.svg';

const ImageModal = ({ src, onClose }) => {
  if (!src) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] cursor-pointer"
    >
      <img
        src={src}
        className="max-w-[90%] max-h-[90%] object-contain"
        alt="Zoomed"
      />
    </div>
  );
};

const ServiceOfficeTemplates = () => {
  const { slug } = useParams();
  const [zoomedImage, setZoomedImage] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { data: project, isLoading, isError, error } = useQuery({
    queryKey: ['foreign-office', slug],
    queryFn: async () => await getAPiData(`/v1/foreign/getBySlug/${slug}`),
    enabled: !!slug,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!project) return <p>Project not found.</p>;

  const name = project.header || 'No name';
  const description = project.description || 'Service office detail';
  const mainImage = project.officeimage?.[0]?.url
    ? (project.officeimage[0].url.startsWith('http')
      ? project.officeimage[0].url
      : `${import.meta.env.VITE_API_BASE_URL}${project.officeimage[0].url}`)
    : null;

  const showNavigation = project.images?.length > 3;

  return (
    <>
      {project && (
        <Helmet key={slug}>
          <title>{name} | RR Group</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={`${name} | RR Group`} />
          <meta property="og:description" content={description} />
          {mainImage && <meta property="og:image" content={mainImage} />}
          <meta property="og:type" content="article" />
        </Helmet>
      )}

      <div className="container mx-auto my-20 px-4 max-w-screen-xl">
        <div className="py-7">
          <h1 className={clsx(styles.detailname)}>{name}</h1>
          <div className={clsx(styles.detname)}>
            {description?.split('\n\n').map((p, idx) => (
              <p key={idx} className="mb-4">{p}</p>
            ))}
          </div>
          {project?.content && (
            <div
              className={clsx(styles.detname, 'ql-editor')}
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          )}
        </div>

        {project?.images?.length > 0 && (
          <div className="relative container max-w-screen-xl mx-auto my-10 px-3">
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
              spaceBetween={20}
              zoom={{ maxRatio: 2 }}
              navigation={showNavigation ? { prevEl: prevRef.current, nextEl: nextRef.current } : false}
              onBeforeInit={(swiper) => {
                if (showNavigation) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              modules={[Navigation, Zoom]}
              breakpoints={{
                360: { slidesPerView: 1, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              className="mySwiper"
            >
              {project.images.map((filename, index) => {
                const imageUrl = filename
                  ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${filename}`
                  : 'https://via.placeholder.com/400x300';

                return (
                  <SwiperSlide key={index}>
                    <div
                      className="w-full h-[300px] flex items-center justify-center overflow-hidden cursor-pointer rounded-xl shadow-md bg-white"
                      onClick={() => setZoomedImage(imageUrl)}
                    >
                      <img
                        src={imageUrl}
                        alt={`slide-${index}`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {zoomedImage && <ImageModal src={zoomedImage} onClose={() => setZoomedImage(null)} />}
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceOfficeTemplates;
