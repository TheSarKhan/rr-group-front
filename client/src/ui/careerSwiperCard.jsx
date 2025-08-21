import { styled } from "styled-components";




export const CareerSwiperCardContainer = styled.div`
  width: 380px;
  height: 370px;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.36);
  display: flex;
  flex-direction: column;
  height: 261px;
    flex-shrink: 0;
    align-self: stretch;
    display: flex;
width: 394px;
height: 374px;
padding: 0px 1px;
flex-direction: column;
align-items: flex-start;
gap: 10px;
border-radius: 10px;
border: 1px solid rgba(170, 170, 170, 0.20);
  overflow:hidden;
`;

export const CareerSwiperImage = styled.div`
  overflow:hidden;
  display: block;
    height: 261px;
    flex-shrink: 0;
    align-self: stretch;
`;
export const CareerImageCont = styled.img`
width:100%;
height:100%;
object-fit:cover;
`
export const CareerNameCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 5px;
  gap: 10px;
  width: 100%; /* <-- Add this */
`;

export const CareerSwiperName = styled.h2`
  color: #0F2431;
font-family: Inter;
font-size: 26px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

export const CareerSwiperDesc = styled.p`
    color: rgba(0, 0, 0, 0.60);
font-family: Inter;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
width: 82px;
height: 22px;
flex-shrink: 0;
`;

