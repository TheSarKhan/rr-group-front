import { styled } from "styled-components";

export const CertificateSwiperContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
`;

export const CertificateSwiperImageContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 384px;
  height: 432px;
  border: 2px solid lightgray;

  
  
`;

export const CertificateSwiperImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease-in-out, filter 0.4s ease-in-out;
`;



export const CertificateSwiperImageContainerWithHover = styled(CertificateSwiperImageContainer)`
 
`;
