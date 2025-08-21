import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAPiData } from '@/http/api';
import clsx from 'clsx';
import styles from './style.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ArrowLeft from '@/assets/arrow-left.svg';
import ArrowRight from '@/assets/arrow-right.svg';
import ProjectSwiper from '@/components/sections/projectSwiper'; 
import './style.css'
import { Helmet } from 'react-helmet-async';

const ProjectDetailTemplate = () => {
  const { slug } = useParams();

  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => getAPiData(`/v1/projects/getBySlug/${slug}`),
    enabled: !!slug,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!project) return <p>Project not found.</p>;

  const images = project.images || [];
  const name = project.name || 'No name';
  const date = project.constructDate || 'No date';
  const customer = project.orderOwner || 'No customer';
  const image = images[0] || null;
const imageUrl = image
  ? (image.startsWith('http') 
      ? image 
      : `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${image}`)
  : 'https://via.placeholder.com/150';

  return (
    <>
      <Helmet>
      <title>{name} | Layihələr | RR Group</title>
      <meta property="og:title" content={`${name} | Rrgroup`} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="article" />
      <meta name="description" content={project.content?.slice(0, 150) || 'Project detail page'} />
    </Helmet>
          <div className="container mx-auto my-20 px-4 max-w-screen-xl">
      {images.length > 0 && (
        <div className="relative">
          <div className="swiper-button-prev-cert custom-swiper-button">
    <ArrowLeft />
  </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next-cert',
              prevEl: '.swiper-button-prev-cert',
            }}
            breakpoints={{
              340: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 1,
              },
            }}
            modules={[Navigation]}
            className={clsx(styles.projectSwiper)}
          >
            {images.map((img, index) => {
              const imageUrl = img.startsWith('http')
                ? img
                : `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`;
              return (
                <SwiperSlide key={index}>
              <div className={clsx(styles.projectimage)}>
                <img className={clsx(styles.projectimg)} src={imageUrl} alt={`Project ${index + 1}`} />
              </div>
            </SwiperSlide>

              );
            })}
          </Swiper>
          <div className="swiper-button-next-cert custom-swiper-button">
    <ArrowRight />
  </div>
        </div>
      )}

      <div className="py-7">
        <div className="flex gap-6 py-6">
          <h2 className={clsx(styles.detailname)}>Layihə adı</h2>
          <h1 className={clsx(styles.detname)}>{name}</h1>
        </div>
        <div className="flex gap-6 py-6">
          <h2 className={clsx(styles.detailname)}>İnşaat tarixi</h2>
          <h1 className={clsx(styles.detname)}>{date}</h1>
        </div>
        <div className="flex gap-6 py-6">
          <h2 className={clsx(styles.detailname)}>Sifarişçi</h2>
          <h1 className={clsx(styles.detname)}>{customer}</h1>
        </div>
        <div className="flex gap-6 py-6">
          <h2 className={clsx(styles.detailname)}>Məzmun</h2>
          <div
            className={clsx(styles.detname, 'ql-editor')}
            dangerouslySetInnerHTML={{ __html: project.content || '' }}
          />
        </div>
      </div>
      <ProjectSwiper images={project.images || []} />
    </div>
    </>
    
  );
};

export default ProjectDetailTemplate;

