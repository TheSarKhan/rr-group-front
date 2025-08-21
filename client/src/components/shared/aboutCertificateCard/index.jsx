import React from 'react'
import { CertificateSwiperImage, CertificateSwiperImageContainerWithHover } from '@/ui/aboutCertificate'

const CertificateSwiperCard = ({ ImageSrc,  }) => {
  // const basePath = import.meta.env.BASE_URL || '';
    return (
        <CertificateSwiperImageContainerWithHover>
        <CertificateSwiperImage src={ImageSrc} />
      </CertificateSwiperImageContainerWithHover>
    )
}

export default CertificateSwiperCard
