import React, { useState } from 'react';
import {
  KsmButton,
  KsmImageCont,
  KsmSwiperCardContainer,
  KsmSwiperDesc,
  KsmSwiperImage,
  KsmSwiperName
} from '@/ui/ksmCards';
import { Link } from 'react-router-dom';

export default function KsmCards({ slug, ImageSrc, name, desc }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <KsmSwiperCardContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <KsmSwiperImage>
        <KsmImageCont
          src={ImageSrc}
          alt={name}
        />
      </KsmSwiperImage>
      <KsmSwiperName>{name}</KsmSwiperName>
      <KsmSwiperDesc dangerouslySetInnerHTML={{ __html: desc }} />
      <Link to={`/ksm/${slug}`}>
      <KsmButton>Ətraflı</KsmButton>
      </Link>
    </KsmSwiperCardContainer>
  );
}
