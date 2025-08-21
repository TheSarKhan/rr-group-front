import React from 'react';
import ProjectsPage from '@/components/sections/projectsPage';
import { Helmet } from 'react-helmet-async';

const ProjectsTemplates = () => {
  const title = 'Layihələr';
  const description =
    'RR Group — Azərbaycanda həyata keçirilmiş və davam edən layihələr. Peşəkar inşaat və mühəndislik həlləri.';
  const pageUrl = `${window.location.origin}/projects`;
  const ogImage = `${window.location.origin}/projects-og-image.jpg`; // Uygun görsel yolu ekle

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
        {/* <SpecialProjects /> */}
        <ProjectsPage />
      </div>
    </>
  );
};

export default ProjectsTemplates;
