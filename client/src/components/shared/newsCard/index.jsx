import React from 'react'
import styles from './style.module.scss'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

const NewsCard = ({ news }) => {
  const title = news?.title || 'No Title'
  const paragraph = news?.paragraph || 'No Description'
  // const imageUrl = news?.images?.url
  // ? news.image.url.startsWith('http')
  //   ? news.image.url
  //   : `${import.meta.env.VITE_API_BASE_URL}${news.image.url}`
  // : 'https://via.placeholder.com/300'
  const icon = news?.images?.[0]; 
  // const imageUrl = icon
  //               ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${icon}`
  //               : 'https://via.placeholder.com/150';
  //               console.log('Image URL:', imageUrl);
  const truncateWords = (text, limit) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  };

  const imageUrl = icon
  ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${icon}`
  : 'https://via.placeholder.com/150';

  return (
   <div>
    <Link to={`/news/${news?.slug}`}>
     <div className={clsx(styles.newscard)}>
     <div className={clsx(styles.newsimage)}>
     <img
        className={clsx(styles.newsimg)}
        src={imageUrl}
        alt={title}
      />
     </div>
      <div className="p-3">
      <h3 className={clsx(styles.newsname)}>{truncateWords(title, 5)}</h3>

        <div
  className={clsx(styles.newsdesc)}
  dangerouslySetInnerHTML={{ __html: truncateWords(paragraph, 5) }}
/>

      </div>
    </div>
    </Link>
   </div>
  )
}

export default NewsCard
