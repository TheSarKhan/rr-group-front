import React from 'react';
import KsmSection from '@/components/sections/ksmSection';
import { Helmet } from 'react-helmet-async';

const KsmTemplates = () => {
  const title = 'KSM';
  const description =
    'RR Group — KSM haqqında məlumat. Layihələrimiz, xidmətlərimiz və əməkdaşlıq imkanları haqqında öyrənin.';
  const pageUrl = `${window.location.origin}/ksm`;
  const ogImage = `${window.location.origin}/ksm-og-image.jpg`; // Uygun görsel yolu ekle

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
        <KsmSection />
      </div>
    </>
  );
};

export default KsmTemplates;
