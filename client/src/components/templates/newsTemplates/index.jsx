import React from 'react';
import NewsPage from '@/components/sections/newsPage';
import { Helmet } from 'react-helmet-async';

const NewsTemplates = () => {
  const title = 'Xəbərlər';
  const description =
    'RR Group — Şirkətimizdən ən son xəbərlər, yeniliklər və elanlar.';
  const pageUrl = `${window.location.origin}/news`;
  const ogImage = `${window.location.origin}/news-og-image.jpg`; // Uygun görsel yolu ekle

  return (
    <>
      <Helmet>
        {/* SEO */}
        <title>{`${title} | RR Group`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={`${title} | RR Group`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | RR Group`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <div>
        <NewsPage />
      </div>
    </>
  );
};

export default NewsTemplates;
