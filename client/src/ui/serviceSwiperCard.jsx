// import { styled } from "styled-components";


// export const ServiceSwiperCardContainer = styled.div`
// display: flex;
// width:100%;
// padding: 20px 44px;
// justify-content: center;
// align-items: center;
// gap: 10px;
// border-radius: 51px;
// border: 1px solid #0F2431;
// height:65px;
// `;


// export const ServiceSwiperDesc = styled.p`
//    color: #0F2431;
// font-family: Inter;
// font-size: 20px;
// font-style: normal;
// font-weight: 500;
// line-height: normal;
// `;

import { styled } from "styled-components";

export const ServiceSwiperCardContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 44px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 51px;
  border: 1px solid #0F2431;
  height: 65px;
  cursor: pointer; /* pointer cursor */

  &:hover {
    background-color: rgba(217, 217, 217, 0.20); 
  }
`;

export const ServiceSwiperDesc = styled.p`
  color: #0F2431;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

`;


