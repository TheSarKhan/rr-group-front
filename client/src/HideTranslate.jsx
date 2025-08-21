import React, { useEffect } from 'react';

const HideGoogleTranslateBanner = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const banner = document.querySelector('iframe.goog-te-banner-frame.skiptranslate');
      if (banner) {
        banner.style.display = 'none';
        document.body.style.top = '0px';
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn’t render anything visible
};

export default HideGoogleTranslateBanner;
