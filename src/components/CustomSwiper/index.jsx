import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper';

function CustomSwiper({ children, swiperClassName }) {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={6}
      scrollbar={{ draggable: true }}
      className={swiperClassName}
      breakpoints={{
        10: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        700: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
        // when window width is >= 640px
        1000: {
          slidesPerView: 7,
          spaceBetween: 40,
        },
        1400: {
          slidesPerView: 9,
          spaceBetween: 40,
        },
      }}
    >
      {children}
    </Swiper>
  );
}

export default CustomSwiper;
