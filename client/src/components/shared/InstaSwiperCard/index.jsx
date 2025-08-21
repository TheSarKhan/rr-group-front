import { InstaSwiperCardContainer, InstaSwiperImage, MissionImageCont, MissionSwiperDesc, MissionSwiperName } from '@/ui/InstaSwiperCard';
import React from 'react';


export default function InstaSwiperCard({ ImageSrc, name, desc }) {
  return (
    <InstaSwiperCardContainer>
      <InstaSwiperImage>
      <MissionImageCont src={ImageSrc} alt={name} />
      </InstaSwiperImage>
      <MissionSwiperName>{name}</MissionSwiperName>
      <MissionSwiperDesc  dangerouslySetInnerHTML={{ __html: desc }} />

    </InstaSwiperCardContainer>
  );
}

