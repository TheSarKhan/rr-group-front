import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAPiData } from '@/http/api';
import clsx from 'clsx';
import styles from './style.module.scss';
import KsmDetailSwiper from '@/components/sections/ksmDetailSwiper';
import { Helmet } from 'react-helmet-async';

const KsmDetailTemplates = () => {
  const { slug } = useParams();

  const {
    data: ksm,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['ksm', slug],
    queryFn: async () => await getAPiData(`/v1/ksm/getBySlug/${slug}`),
    enabled: !!slug,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!ksm) return <p>KSM not found.</p>;

  const context = ksm.paragraph || 'No context';
  const mainImage = ksm.images?.[0] || null;
const mainImageUrl = mainImage
  ? (mainImage.startsWith('http')
      ? mainImage
      : `${import.meta.env.VITE_API_BASE_URL}${mainImage}`)
  : 'https://via.placeholder.com/150';


  return (
    <>
     <Helmet>
    <title>{ksm.title || 'KSM Detail'} | Rrgroup</title>
    <meta name="description" content={ksm.paragraph?.slice(0, 150) || 'KSM detail page'} />
    <meta property="og:title" content={`${ksm.title || 'KSM Detail'} | Rrgroup`} />
    <meta property="og:description" content={ksm.paragraph?.slice(0, 150) || 'KSM detail page'} />
    <meta property="og:image" content={mainImageUrl} />
    <meta property="og:type" content="article" />
  </Helmet>
  <div className="container mx-auto my-20 px-4 max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className={clsx(styles.desccont)}>
          <div className="py-6">
          <div className="ql-editor" dangerouslySetInnerHTML={{ __html: context }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '950px' }}>
        {ksm.extraimages?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {ksm.extraimages.map((imgObj, idx) => (
              <div key={idx} className={clsx(styles.projectimage)}>
                <img
                  className="w-full h-full object-cover"
                  src={
                    imgObj?.url?.startsWith('http')
                      ? imgObj.url
                      : `${import.meta.env.VITE_API_BASE_URL}${imgObj?.url}`
                  }
                  alt={`Extra image ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <KsmDetailSwiper images={ksm.images} />
    </div>
    </>
    
  );
};

export default KsmDetailTemplates;

