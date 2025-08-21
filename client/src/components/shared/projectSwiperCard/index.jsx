// import { ProjImageCont, ProjSwiperCardContainer, ProjSwiperDesc, ProjSwiperImage, ProjSwiperName } from '@/ui/projectSwiperCard';
// import React from 'react';


// export default function ProjectSwiperCard({ ImageSrc, name, desc }) {
//   return (
//     <ProjSwiperCardContainer>
//       {/* <InstaSwiperImage src={ImageSrc} alt={name} /> */}
//       <ProjSwiperImage>
//       <ProjImageCont src={ImageSrc} alt={name} />
//       </ProjSwiperImage>
//       <ProjSwiperName>{name}</ProjSwiperName>
//       {/* <ProjSwiperDesc>{desc}</ProjSwiperDesc> */}
//       <ProjSwiperDesc
//         className="ql_editor"
//         dangerouslySetInnerHTML={{ __html: desc }}
//       />
//     </ProjSwiperCardContainer>
//   );
// }

import {
  ProjImageCont,
  ProjSwiperCardContainer,
  ProjSwiperDesc,
  ProjSwiperImage,
  ProjSwiperName,
} from '@/ui/projectSwiperCard';
import React from 'react';

// const truncateHTML = (htmlString, maxChars = 250) => {
//   const div = document.createElement("div");
//   div.innerHTML = htmlString;
//   const text = div.textContent || div.innerText || "";
//   const sliced = text.slice(0, maxChars).trim();
//   return sliced + (text.length > maxChars ? "..." : "");
// };

export default function ProjectSwiperCard({ ImageSrc, name, desc }) {
  return (
    <ProjSwiperCardContainer>
      <ProjSwiperImage>
        <ProjImageCont src={ImageSrc} alt={name} />
      </ProjSwiperImage>
      <ProjSwiperName>{name}</ProjSwiperName>

      <ProjSwiperDesc dangerouslySetInnerHTML={{ __html: desc }} />

    </ProjSwiperCardContainer>
  );
}
