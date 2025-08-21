import React from 'react';
import { ServiceDetailSwiperImage, ServiceDetailSwiperImageContainer } from '@/ui/serviceDetailSwiper';

const ServiceDetailSwiperCard = ({ ImageSrc }) => {
    return (
        <ServiceDetailSwiperImageContainer>
            <ServiceDetailSwiperImage src={ImageSrc} alt="Service" />
        </ServiceDetailSwiperImageContainer>
    )
}

export default ServiceDetailSwiperCard;
