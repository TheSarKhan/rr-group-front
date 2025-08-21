import { CareerImageCont, CareerNameCont, CareerSwiperCardContainer, CareerSwiperDesc, CareerSwiperImage, CareerSwiperName } from '@/ui/careerSwiperCard';
import React from 'react';


export default function CareerSwiperCard({ ImageSrc, name, desc }) {
  return (
    <CareerSwiperCardContainer>
      <CareerSwiperImage>
      <CareerImageCont src={ImageSrc} alt={name}  />
      </CareerSwiperImage>
      <CareerNameCont>
      <CareerSwiperName>{name}</CareerSwiperName>
      <CareerSwiperDesc dangerouslySetInnerHTML={{ __html: desc }} />
      </CareerNameCont>
    </CareerSwiperCardContainer>
  );
}

