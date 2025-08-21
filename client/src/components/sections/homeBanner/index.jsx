import React from 'react';

//const carouselTexts = ['Biz ölkəmiz üçün tikirik'];

const HomeBanner = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const goToPrevious = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? carouselTexts.length - 1 : prevIndex - 1
  //   );
  // };

  // const goToNext = () => {
  //   setCurrentIndex((prevIndex) =>
  //     (prevIndex + 1) % carouselTexts.length
  //   );
  // };

  return (
    <div className="w-full h-[607px] relative sm:h-[600px] xs:h-[300px]">
      <img
        src={`${import.meta.env.BASE_URL}assets/banner.svg`}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-5 sm:px-10 md:px-20">
        <div className="flex items-center gap-4 sm:gap-8 md:gap-10">
          <button onClick={goToPrevious} aria-label="Previous">
            <img
              src={`${import.meta.env.BASE_URL}assets/arrow-right.svg`}
              alt="Previous"
              className="w-12 h-12 sm:w-[76px] sm:h-[80px]"
            />
          </button>

          <div
            style={{
              color: '#FFF',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              lineHeight: 'normal',
              whiteSpace: 'nowrap',
            }}
            className="text-xl sm:text-3xl md:text-[52px]"
          >
            {carouselTexts[currentIndex]}
          </div>
        </div>

    
        <button onClick={goToNext} aria-label="Next">
          <img
            src={`${import.meta.env.BASE_URL}assets/arrow-left.svg`}
            alt="Next"
            className="w-12 h-12 sm:w-[76px] sm:h-[80px]"
          />
        </button>
      </div> */}
    </div>
  );
};

export default HomeBanner;
