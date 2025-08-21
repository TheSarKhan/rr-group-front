import clsx from 'clsx';
import React from 'react';
import styles from './style.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getAPiData } from '@/http/api';

const AboutManagement = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['MANAGEMENT_STRUCTURE'],
    queryFn: () => getAPiData('/v1/management-structure/get'),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <h1 className={clsx(styles.history, "text-center mb-6")}>İdarəetmə strukturu</h1>

      <div className="max-w-4xl text-center">
      <div
    className={clsx("ql-editor", styles.histdesc)}
    dangerouslySetInnerHTML={{ __html: data?.paragraph || "" }}
  />
      </div>
    </div>
  );
};

export default AboutManagement;
