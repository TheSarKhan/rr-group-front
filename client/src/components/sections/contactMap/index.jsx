import React from 'react'

const ContactMap = () => {
    return (
      <div className="container max-w-screen-xl mx-auto my-15 px-3 relative">
        <div className="relative w-full" style={{ paddingBottom: '56.25%', height: '670px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3042.502559426726!2d49.746517499999996!3d40.3090027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307f0071feaeff%3A0xa2e41f8461665bdc!2sErt%20Agro%20Ofis!5e0!3m2!1sen!2saz!4v1749073053599!5m2!1sen!2saz"
            className="absolute top-0 left-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    )
  }
  

export default ContactMap