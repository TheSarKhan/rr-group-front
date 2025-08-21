import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';
import { getAPiData } from '../../../http/api';
import Housee from '../../../assets/housee.jpg'

const HomeRanking = () => {
  const [aboutCards, setAboutCards] = useState([]);

  useEffect(() => {
    getAPiData('/v1/home/about/get')
      .then(data => {
        setAboutCards(data || []);
      })
      .catch(err => console.error('HomeRanking error:', err));
  }, []);


  return (
    <div className="mx-auto px-4 my-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div className="flex justify-center">
        {/* <div className={clsx(styles.homeimg)}>
          <img
              src={`${import.meta.env.BASE_URL}assets/home.svg`}
              alt="Home"
              className="w-full max-w-md md:max-w-full object-contain"
            />
            <House/>
         </div> */}
         <img src={Housee} alt="House" className={clsx(styles.homeimg)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {aboutCards.map((card, index) => (
            <div key={index} className="p-6 text-center sm:text-left">
              <h1 className={clsx(styles.rankingnum)}>{card.title}</h1>
              <p className={clsx(styles.rankingdesc)}>{card.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HomeRanking;

