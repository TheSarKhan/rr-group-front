import React from 'react'
import { Helmet } from 'react-helmet'
import AboutBoard from '@/components/sections/aboutBoard'
import AboutCertificate from '@/components/sections/aboutCertificate'
import AboutHistory from '@/components/sections/aboutHistory'
import AboutManagement from '@/components/sections/aboutManagement'
import InstaSwiper from '@/components/sections/aboutMission'
import AboutValues from '@/components/sections/aboutValues'
import AboutVision from '@/components/sections/aboutVision'

const AboutTemplates = () => {
  return (
    <div>
      <Helmet>
        <title>Haqqımızda | RR Group İnşaat</title>
        <meta 
          name="description" 
          content="RR Group İnşaat — Missiyamız, dəyərlərimiz, tariximiz və idarə heyətimiz haqqında daha ətraflı öyrənin."
        />
        <meta property="og:title" content="Haqqımızda | RR Group İnşaat" />
        <meta 
          property="og:description" 
          content="Missiyamız, dəyərlərimiz, tariximiz və idarə heyətimiz haqqında məlumat alın."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rrgroup.az/about" />
        <meta property="og:image" content="https://rrgroup.az/assets/about-cover.jpg" />
      </Helmet>

      <InstaSwiper/>
      <AboutVision/>
      <AboutValues/>
      <AboutHistory/>
      <AboutBoard/>
      <AboutManagement/>
      <AboutCertificate/>
    </div>
  )
}

export default AboutTemplates
