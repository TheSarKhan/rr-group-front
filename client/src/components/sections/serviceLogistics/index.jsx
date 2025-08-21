import React from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'
import ServiceLogisticsSwiper from '../serviceLogisticsSwiper'

const ServiceLogistics = () => {
  return (
    <div className="container max-w-screen-xl mx-auto my-20 px-5 relative">
        <div className='px-5'>
            <h1 className={clsx(styles.constname)}>Logistika</h1>
            <p className={clsx(styles.constdesc)}>Aqrovest Logistics" daxili və beynəlxalq əhəmiyyətli tranzit yollarının üzərində yerləşir. 2010-cu ildə istifadəyə verilmiş olan “Aqrovest Logistics” mərkəzi beynəlxalq standartların tələblərinə uyğun inşa edilmiş və avadanlıqlarla təchiz edilmişdir.</p>
        </div>
        <ServiceLogisticsSwiper/>
    </div>
  )
}

export default ServiceLogistics