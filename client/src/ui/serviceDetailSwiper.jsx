import { styled } from "styled-components";

export const ServiceDetailSwiperContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
`;
 
export const ServiceDetailSwiperImageContainer = styled.div`
  width: 100%;
  height: 360px;          /* height artırıldı */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #fff;
`;

export const ServiceDetailSwiperImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;





export const NewsSwiperImageContainerWithHover = styled(ServiceDetailSwiperContainer)`

`;
