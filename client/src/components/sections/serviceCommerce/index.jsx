import React from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'
import ServiceCommerceSwiper from '@/components/shared/serviceCommerceSwiper'
import ServiceBigCommerceSwiper from '../ServiceBigCommerceSwiper'

const ServiceCommerce = () => {
  return (
    <div className="container max-w-screen-xl mx-auto my-20 px-5 relative">
        <div className='px-5'>
            <h1 className={clsx(styles.constname)}>Ticarət</h1>
            <p className={clsx(styles.constdesc)}>Aqrovest Logistics" daxili və beynəlxalq əhəmiyyətli tranzit yollarının yaxınlığında yerləşir. 2010-cu ildə istifadəyə verilmiş olan “Aqrovest Logistics” mərkəzi beynəlxalq standartların tələblərinə uyğundur </p>
        </div>
        <ServiceCommerceSwiper/>
        <ServiceBigCommerceSwiper/>
    </div>
  )
}

export default ServiceCommerce