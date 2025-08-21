import React from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';
import { QueryKeys } from '@/constants/QueryKeys';
import { getAPiData } from '@/http/api';
import { useQuery } from '@tanstack/react-query';

const HomeChoose = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.CHOOSEUS],
    queryFn: () => getAPiData('/v1/whyChooseUs/getAll'),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data || !Array.isArray(data)) return <p>No data found.</p>;

  return (
    <div className="container max-w-screen-xl mx-auto my-20 px-3 space-y-6 relative">
      <h1 className={clsx(styles.aboutus)}>Niyə bizi seçməlisiniz?</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
        {/* Art çizgileri */}
        <div
          className={clsx(styles.plusline)}
          style={{
            position: 'absolute',
            top: '10%',
            bottom: '10%',
            left: '50%',
            width: '1px',
            background: 'rgba(0, 0, 0, 0.20)',
            transform: 'translateX(-50%)',
            zIndex: 0,
          }}
        />
        <div
          className={clsx(styles.plusline)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '5%',
            right: '5%',
            height: '1px',
            background: 'rgba(0, 0, 0, 0.20)',
            transform: 'translateY(-50%)',
            zIndex: 0,
          }}
        />

        {data.slice(0, 4).map(({ id, icon, title, paragraph }) => {
          const imageUrl = icon
            ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${icon}`
            : 'https://via.placeholder.com/150';

          return (
            <div key={id}>
              <div className="bg-white flex justify-center items-center p-5">
                <div className="relative plus-border max-w-2xl p-6 rounded-lg text-black bg-white">
                  <div className="flex gap-2 items-start">
                    <img className="h-16 w-16" src={imageUrl} alt={title} />
                    <div>
                      <h5 className={clsx(styles.choosename)}>{title}</h5>
                      <p
                        className={clsx(styles.choosedesc)}
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeChoose;
