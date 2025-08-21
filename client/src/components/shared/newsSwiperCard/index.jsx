import React from 'react'
import { NewsSwiperContainer, NewsSwiperImage, NewsSwiperImageContainer, NewsSwiperImageContainerWithHover } from '@/ui/newsSwiper';

const NewsSwiperCard = ({ ImageSrc,  }) => {
    return (
        <NewsSwiperImageContainerWithHover>
        <NewsSwiperImage src={ImageSrc} alt={name} />
      </NewsSwiperImageContainerWithHover>
    )
}

export default NewsSwiperCard
