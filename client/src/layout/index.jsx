import React from 'react';
import { Outlet } from 'react-router-dom';  
import Header from './header';
import Footer from './footer';
import Breadcrumb from './breadcrumb';
import { Helmet } from 'react-helmet-async'; 

const Layout = () => {
  return (
    <>
    
      <Helmet>
<title>RR Group İnşaat | Tikinti, Layihələndirmə və Təmir Xidmətləri</title>
<meta property="og:title" content="RR Group İnşaat | Tikinti və Təmir Xidmətləri" />
<meta 
  name="description" 
  content="RR Group — Azərbaycanda peşəkar inşaat, tikinti, layihələndirmə və təmir xidmətləri. Keyfiyyət, dəqiqlik və etibarlılıq ilə xidmətinizdəyik." 
/>

<meta property="og:description" content="Azərbaycanda yüksək keyfiyyətli inşaat və təmir xidmətləri. RR Group ilə etibarlı layihələr." />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://rrgroup.az/assets/cover.jpg" />
<meta property="og:url" content="https://rrgroup.az" />

      </Helmet>

      <Header />
      <Breadcrumb />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default Layout;
