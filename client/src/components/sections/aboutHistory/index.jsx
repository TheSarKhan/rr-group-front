import React from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { getAPiData } from '@/http/api';

const AboutHistory = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['HISTORY'],
    queryFn: () => getAPiData('/v1/history/get'),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const historyText = data?.history || "";

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <h1 className={clsx(styles.history, "text-center mb-6")}>Korporativ tarix</h1>

      <div className="max-w-4xl text-center">
  <div
    className={clsx("ql-editor", styles.histdesc)}
    dangerouslySetInnerHTML={{ __html: historyText }}
  />
</div>

    </div>
  );
};

export default AboutHistory;
