// import React, { useEffect, useState } from "react";
// import { getSocials } from "@/http/social";

// const SocialIcons = () => {
//   const [socials, setSocials] = useState([]);

//   useEffect(() => {
//     getSocials()
//       .then((res) => {
//         const data = Array.isArray(res?.data) ? res.data : [];
//         setSocials(data);
//       })
//       .catch((err) => {
//         console.error("Failed to load socials", err);
//       });
//   }, []);

//   const baseURL = import.meta.env.VITE_API_BASE_URL;

//   return (
//     <div className="flex space-x-4 justify-end py-6">
//       {socials.map(({ id, title, image }) => (
//         <a
//           key={id}
//           href="#"
//           className="text-white hover:text-white transition"
//           aria-label={title}
//           title={title}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <span className="sr-only">{title}</span>
//           <img
//             src={`${baseURL}/v1/files/view/${image}`}
//             alt={title}
//             className="h-8 w-8 object-contain"
//           />
//         </a>
//       ))}
//     </div>
//   );
// };

// export default SocialIcons;
import React, { useEffect, useState } from "react";
import { getSocials } from "@/http/social";

const SocialIcons = () => {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    getSocials()
      .then((res) => {
        const data = Array.isArray(res?.data) ? res.data : [];
        setSocials(data);
      })
      .catch((err) => {
        console.error("Failed to load socials", err);
      });
  }, []);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className="flex space-x-4 justify-end py-6">
      {socials.map(({ id, title, image, link }) => (
        <a
          key={id}
          href={link || "#"} // ✅ Use actual link
          className="text-white hover:text-white transition"
          aria-label={title}
          title={title}
          target="_blank" // ✅ Open in new tab
          rel="noopener noreferrer"
        >
          <span className="sr-only">{title}</span>
          <img
            src={`${baseURL}/v1/files/view/${image}`}
            alt={title}
            className="h-8 w-8 object-contain"
          />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
