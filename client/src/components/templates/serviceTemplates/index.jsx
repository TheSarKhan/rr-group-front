import React from 'react';
import ServiceConstruction from '@/components/sections/serviceConstruction';
import ServiceCommerce from '@/components/sections/serviceCommerce';
import ServiceLogistics from '@/components/sections/serviceLogistics';
import ServiceOffices from '@/components/sections/serviceOffices';
// import ServiceSetem from '@/components/sections/serviceSetem';
import { Helmet } from 'react-helmet-async';

const ServiceTemplates = () => {
  const title = 'Xidmətlər';
  const description =
    'RR Group — İnşaat, logistika, ofis xidmətləri və daha çox sahədə peşəkar həllər.';
  const pageUrl = `${window.location.origin}/services`;
  const ogImage = `${window.location.origin}/services-og-image.jpg`; // Uygun görsel yolu ekle

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
        <ServiceConstruction />
        {/* <ServiceCommerce /> */}
        {/* <ServiceLogistics /> */}
        <ServiceOffices />
        {/* <ServiceSetem /> */}
      </div>
    </>
  );
};

export default ServiceTemplates;
