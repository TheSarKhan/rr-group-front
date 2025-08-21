import React from 'react'
import LogoFooter from '@/assets/footer.svg';
import './style.css'
import SocialIcons from '@/components/shared/SocialIcons';
const Footer = () => {
  return (
    <div>
      <footer className="bg-[#0F2431] text-white pt-12 mt-20 pb-8">
  <div className="container mx-auto px-4 max-w-screen-xl">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
      <div className="space-y-4">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
                      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        <LogoFooter/>
                      </span>
                  </a>
        </div>
        
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Şirkət</h3>
        <ul className="space-y-3">
          <li><a href="/about" className="text-white hover:text-white transition">Haqqımızda</a></li>
          <li><a href="/career" className="text-white hover:text-white transition">Karyera</a></li>
          <li><a href="/ksm" className="text-white hover:text-white transition">KSM</a></li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Xidmətlər və Layihələr</h3>
        <ul className="space-y-3">
          <li><a href="/services" className="text-white hover:text-white transition">Xidmətlər</a></li>
          <li><a href="/projects" className="text-white hover:text-white transition">Layihələr</a></li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Əlaqə və Məlumat</h3>
        <ul className="space-y-3">
          <li><a href="/contact" className="text-white hover:text-white transition">Əlaqə</a></li>
          <li><a href="/news" className="text-white hover:text-white transition">Xəbərlər</a></li>
        </ul>
      </div>
    </div>
    <div className="flex space-x-4 justify-end py-6">
    {/* <a href="#" className="text-white hover:text-white transition" aria-label="LinkedIn">
  <span className="sr-only">LinkedIn</span>
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 19h-3v-10h3v10zm-1.5-11.27c-.966 0-1.75-.79-1.75-1.75s.784-1.75 1.75-1.75 1.75.79 1.75 1.75-.784 1.75-1.75 1.75zm13 11.27h-3v-5.5c0-1.1-.9-2-2-2s-2 .9-2 2v5.5h-3v-10h3v1.36c.88-1.28 3.12-1.36 4.01 0 .47.68.99 1.64.99 3.14v5.5z" />
  </svg>
</a>
          <a href="#" className="text-white hover:text-white transition">
            <span className="sr-only">Facebook</span>
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a> */}
<SocialIcons/>

          
          
        </div>
    <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-center items-center">
      <p className="text-white  text-[16px] from-light mb-4 md:mb-0">RR GROUP OF COMPANIES © 2025</p>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer