import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAPiData } from '@/http/api';
import NewsSwiper from '@/components/sections/newsSwiper';
import CertificateModal from '@/components/sections/certificateModal';
import { Helmet } from 'react-helmet-async';


const NewsDetailTemplate = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    data: news,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['news-detail', slug],
    queryFn: async () => await getAPiData(`/v1/news/getBySlug/${slug}`),
    enabled: !!slug,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!news) return <p>Xəbər tapılmadı.</p>;

  const image = news.images?.[0] || null;
  const imageUrl = image
    ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${image}`
    : 'https://via.placeholder.com/150';

  const name = news.title || 'No name';
  const context = news.paragraph || 'No context';

  return (
    <>
    <Helmet>
        <title>Xəbərlər | {name} </title>
        <meta name="description" content={context.slice(0, 150)} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={context.slice(0, 150)} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="container mx-auto my-20 px-4 max-w-screen-xl">
      <div className="flex flex-col md:flex-row gap-6">
        {/* <div className="md:w-1/2 bg-[#F7F7F7] p-5">
          <h1 className="text-2xl md:text-3xl font-semibold text-black mb-4">
            {name}
          </h1>
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: context }}
          />
        </div> */}
       <div className="md:w-1/2 bg-[#F7F7F7] p-5 max-h-[460px] overflow-y-auto">
  <div className="pr-2"> {/* optional: pr-2 to avoid scroll clipping */}
    <h1 className="text-2xl md:text-3xl font-semibold text-black mb-4">
      {name}
    </h1>
    <div
      className="ql-editor p-0 m-0"
      style={{
        overflow: 'visible',
        maxHeight: 'none'
      }}
      dangerouslySetInnerHTML={{ __html: context }}
    />
  </div>
</div>



        <div className="md:w-1/2">
          <img
            className="w-full h-auto object-cover rounded"
            src={imageUrl}
            alt={name}
          />
        </div>
      </div>

      <div className="mt-12">
        <NewsSwiper images={news.images} onImageClick={setSelectedImage} />
      </div>

      {selectedImage && (
        <CertificateModal
          data={{ image: selectedImage, name }}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
      </>
    
  );
};

export default NewsDetailTemplate;
