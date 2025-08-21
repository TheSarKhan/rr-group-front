// import React from 'react'
// import styles from './style.module.scss'
// import clsx from 'clsx'
// import { Link } from 'react-router-dom'

// const truncateText = (text, maxLength = 180) => {
//   if (!text) return '';
//   if (text.length <= maxLength) return text;
//   return text.slice(0, maxLength).trimEnd() + '...';
// };
// const SpecialProjectsCard = ({ news }) => {
//   const title = news?.name || 'No Title'
//   const description = truncateText(news?.content, 120);
//   const image = news?.images[0]
//   const imageUrl = image
//   ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${image}`
//   : 'https://via.placeholder.com/150';

//   function stripHtml(html) {
//     const tmp = document.createElement('DIV');
//     tmp.innerHTML = html;
//     return tmp.textContent || tmp.innerText || '';
//   }
  
//   function truncateText(text, maxLength = 300) {
//     if (!text) return '';
//     if (text.length <= maxLength) return text;
//     return text.slice(0, maxLength).trimEnd() + '...';
//   }
  
//   return (
//    <div>
//     <Link to={`/projects/newprojects/${news?.slug}`}>
//      <div className={clsx(styles.newscard)}>
//      <div className={clsx(styles.newsimage)}>
//      <img
//         className={clsx(styles.newsimg)}
//         src={imageUrl}
//         alt={title}
//       />
//      </div>
//       <div className="p-3">
//         <h3 className={clsx(styles.newsname)}>{title}</h3>
//         {/* <p className={clsx(styles.newsdesc)}>{description}</p> */}
//               <div className={clsx(styles.newsdesc, 'ql_editor')}>
//         {truncateText(stripHtml(news?.content))}
//       </div>



//       </div>
//     </div>
//     </Link>
//    </div>
//   )
// }

// export default SpecialProjectsCard
import React from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const stripHtml = (html) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const truncateText = (text, maxLength = 120) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
};

const SpecialProjectsCard = ({ news }) => {
  const title = news?.name || 'No Title';
  const image = news?.images?.[0];
  const imageUrl = image
    ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${image}`
    : 'https://via.placeholder.com/150';

  const cleanText = truncateText(stripHtml(news?.content), 120);

  return (
    <div>
      <Link to={`/projects/newprojects/${news?.slug}`}>
        <div className={clsx(styles.newscard)}>
          <div className={clsx(styles.newsimage)}>
            <img className={clsx(styles.newsimg)} src={imageUrl} alt={title} />
          </div>
          <div className="p-3">
            <h3 className={clsx(styles.newsname)}>{title}</h3>
            <div className={clsx(styles.newsdesc)}>
              {cleanText}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SpecialProjectsCard;
