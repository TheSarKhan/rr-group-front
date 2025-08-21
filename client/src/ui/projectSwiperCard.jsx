import { styled } from "styled-components";

export const ProjSwiperCardContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px; /* max width on larger screens */
  min-height: auto;
  padding: 30px 19px;
  flex-direction: column;
  gap: 10px;
  border-radius: 20px;
  align-items: flex-start;
  background: rgba(217, 217, 217, 0.20);
  cursor:pointer;


  @media (min-width: 1024px) {
    /* laptop and up */
    height: 577px;
  }

  @media (max-width: 1023px) {
    /* tablets and smaller */
    height: auto;
    padding: 20px 15px;
  }
`;

export const ProjSwiperImage = styled.div`
  width: 100%;  
  height: auto;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  align-self: center;
  overflow: hidden;

  @media (min-width: 1024px) {
    /* laptop and up */
    width: 570px;
    height: 400px;
  }

  @media (max-width: 1023px) {
    aspect-ratio: 16 / 9;  
  }
`;

export const ProjImageCont = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProjSwiperName = styled.h2`
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-weight: 600;
  margin: 10px 0 10px 0;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// export const ProjSwiperDesc = styled.p`
//   color: #000;
//   font-family: Inter;
//   font-size: 16px;
//   font-weight: 300;
//   line-height: 1.5;
//   text-align: left;

//   @media (max-width: 768px) {
//     font-size: 14px;
//   }
// `;
export const ProjSwiperDesc = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  text-align: left;

  display: -webkit-box;
  -webkit-line-clamp: 2; /* 👈 force exactly 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 14px;
    -webkit-line-clamp: 2; /* smaller screens: 2 lines */
  }
`;

