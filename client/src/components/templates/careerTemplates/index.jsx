import React from "react";
import CareerCv from "@/components/sections/careerCv";
import CareerSwiper from "@/components/shared/careerSwiper";
import { Helmet } from "react-helmet-async";

const CareerTemplates = () => {
  const title = "Karyera və Vakansiyalar";
  const description =
    "RR Group — Azərbaycanda peşəkar karyera imkanları və vakansiyalar. Bizim komandamıza qoşulun və gələcəyinizi inşa edin.";
  const pageUrl = `${window.location.origin}/career`;
  const ogImage = `${window.location.origin}/career-og-image.jpg`; // Buraya uygun bir görsel ekle

  return (
    <>
      <Helmet>
        {/* Title & Description */}
        <title>{`${title} | RR Group`}</title>
        <meta name="description" content={description} />

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
        <CareerSwiper />
        <CareerCv />
      </div>
    </>
  );
};

export default CareerTemplates;
