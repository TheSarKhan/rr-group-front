import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../../constants/QueryKeys';
import { getAPiData } from '../../../http/api'; 
import KsmCards from '@/components/shared/ksmCards';

export default function KsmSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.KSMS],
    queryFn: async () => await getAPiData('/v1/ksm/getAll')
  });

  // const ksmCards = ksmData?.ksmCards
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative"> 
      {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {[data].map((el, index) => (
  <div key={index}>
    <KsmCards 
      ImageSrc={
        el.icon
          ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${el.icon}`
          : 'https://via.placeholder.com/150'
      }
      name={el.title}
      id={el.id}
      desc={el.description}
    />
  </div>
))}

      </div> */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
  {(data || []).map((el, index) => (
    <div key={index}>
      <KsmCards 
        ImageSrc={
          el.icon
            ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${el.icon}`
            : 'https://via.placeholder.com/150'
        }
        name={el.title}
        slug={el.slug}
        desc={el.description}
      />
    </div>
  ))}
</div>
{/* 
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
  {(data || []).map((el, index) => {
    const imageUrl = el.images && el.images.length > 0
      ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${el.images[0]}`
      : el.icon
        ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${el.icon}`
        : 'https://via.placeholder.com/150';

    return (
      <div key={index}>
        <KsmCards 
          ImageSrc={imageUrl}
          name={el.title}
          id={el.id}
          desc={el.description}
        />
      </div>
    );
  })}
</div> */}

  </div>
  
  );
}
