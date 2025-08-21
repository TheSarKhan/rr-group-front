import React from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { getAPiData } from '@/http/api';

const AboutVision = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['VISION'],
    queryFn: () => getAPiData('/v1/vision/get'),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex text-center justify-center my-5 mx-auto">
        <h1 className={clsx(styles.vision)}>Vizyonumuz</h1>
      </div>
      <section className="bg-[#313756] w-full">
        <div className={clsx(styles.cont)}>
          <div className="space-y-4">
            <p className={clsx(styles.desc)}>
              {data?.vision}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutVision;
