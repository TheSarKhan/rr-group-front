import React from 'react';
import HomeBanner from '@/components/sections/homeBanner';
import AboutUs from '@/components/sections/aboutUs';
import HomeRanking from '@/components/sections/homeRanking';
import HomeProjects from '@/components/sections/homeProjects';
import HomeChoose from '@/components/sections/homeChoose';
import HomeNews from '@/components/sections/homeNews';
import { Helmet } from 'react-helmet-async';

const HomeTemplates = () => {
  const title = 'Ana Səhifə';
  const description =
    'RR Group — Azərbaycanda inşaat, layihə idarəçiliyi və müasir tikinti həlləri. Peşəkar komandamız ilə gələcəyinizi inşa edirik.';
  const pageUrl = `${window.location.origin}/`;
  const ogImage = `${window.location.origin}/home-og-image.jpg`; // Uygun görsel yolu ekle

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
        <HomeBanner />
        <AboutUs />
        <HomeRanking />
        <HomeProjects />
        <HomeChoose />
        <HomeNews />
      </div>
    </>
  );
};

export default HomeTemplates;
