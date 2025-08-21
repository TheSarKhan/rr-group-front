// import React from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { QueryKeys } from '@/constants/QueryKeys'
// import { getAPiData } from '@/http/api'
// import NewsCard from '@/components/shared/newsCard'
// const NewsPage = () => {
//   const { data:newsData, isLoading, isError, error } = useQuery({
//     queryKey: [QueryKeys.NEWSCARDS],
//     queryFn: async () => await getAPiData('/v1/news/getAll'),
//   });
//   console.log("newsData:", newsData);
//   console.log("type of newsData:", typeof newsData);
  
//   if (isLoading) return <p>Loading...</p>
//   if (isError) return <p>Error: {error.message}</p>

//   const news = newsData || []

//   return (
//     <div className='container max-w-screen-xl mx-auto my-20 px-3'>
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//             {
//             news.map((newsItem, index) => (
//         <NewsCard key={index} news={newsItem} />
//       ))}

//       </div>
//     </div>
//   )
// }

// export default NewsPage

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/constants/QueryKeys'
import { getAPiData } from '@/http/api'
import NewsCard from '@/components/shared/newsCard'

const NewsPage = () => {
  const { data: newsData, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.NEWSCARDS],
    queryFn: async () => await getAPiData('/v1/news/getAll'),
  });

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  const news = Array.isArray(newsData) ? newsData : [];

  return (
    <div className='container max-w-screen-xl mx-auto my-20 px-3'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {news.map((item, index) => (
          <NewsCard key={index} news={item} />
        ))}
      </div>
    </div>
  )
}

export default NewsPage
