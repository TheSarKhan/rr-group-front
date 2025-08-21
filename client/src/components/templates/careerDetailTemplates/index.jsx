import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAPiData } from "@/http/api";
import clsx from "clsx";
import styles from "./style.module.scss";
import KsmDetailSwiper from "@/components/sections/ksmDetailSwiper";
import { Helmet } from "react-helmet-async";

const CareerDetailTemplates = () => {
  const { slug } = useParams();

  const {
    data: ksm,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vacancy", slug],
    queryFn: async () => await getAPiData(`/v1/vacancy/getBySlug/${slug}`),
    enabled: !!slug,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!ksm) return <p>Career not found.</p>;

  const context = ksm.content || "No context";
  const title = ksm.title || "Career Detail";
  const description =
    ksm.description ||
    "RR Group — Azərbaycanda peşəkar karyera imkanları və vakansiyalar.";
  const pageUrl = `${window.location.origin}/career/${slug}`;

  // Open Graph ve Twitter için görsel
  const ogImage =
    ksm.images?.[0]?.url?.startsWith("http")
      ? ksm.images[0].url
      : ksm.images?.[0]?.url
      ? `${import.meta.env.VITE_API_BASE_URL}${ksm.images[0].url}`
      : `${window.location.origin}/default-og-image.jpg`;

  return (
    <>
      <Helmet>
        {/* Title & Description */}
        <title>{`${title} | RR Group`}</title>
        <meta name="description" content={description} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`${title} | RR Group`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | RR Group`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <div className="container mx-auto my-20 px-4 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className={clsx(styles.desccont)}>
            <div className="py-6">
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: context }}
              />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "950px" }}>
          {ksm.extraimages?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {ksm.extraimages.map((imgObj, idx) => (
                <div key={idx} className={clsx(styles.projectimage)}>
                  <img
                    className="w-full h-full object-cover"
                    src={
                      imgObj?.url?.startsWith("http")
                        ? imgObj.url
                        : `${import.meta.env.VITE_API_BASE_URL}${imgObj?.url}`
                    }
                    alt={`Extra image ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <KsmDetailSwiper images={ksm.images} />
      </div>
    </>
  );
};

export default CareerDetailTemplates;
