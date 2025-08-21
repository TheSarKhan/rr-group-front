import { styled } from "styled-components";

export const NewsSwiperContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
`;

export const NewsSwiperImageContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 390px;
  height: 284px;
  
  
`;

export const NewsSwiperImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease-in-out, filter 0.4s ease-in-out;
`;



export const NewsSwiperImageContainerWithHover = styled(NewsSwiperImageContainer)`
 
`;

