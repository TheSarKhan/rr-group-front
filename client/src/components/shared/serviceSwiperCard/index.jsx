import React from 'react';
import { ServiceSwiperCardContainer, ServiceSwiperDesc } from '@/ui/serviceSwiperCard';


export default function ServiceSwiperCard({ desc }) {
  return (
    <ServiceSwiperCardContainer>
      <ServiceSwiperDesc>{desc}</ServiceSwiperDesc>
    </ServiceSwiperCardContainer>
  );
}

