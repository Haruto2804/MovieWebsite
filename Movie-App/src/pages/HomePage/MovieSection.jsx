import MovieCard from "../../components/common/MovieCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, FreeMode, Mousewheel, Keyboard, Autoplay } from 'swiper/modules'
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; // Cái này quan trọng nhất!
const MovieSection = ({ title, movieList }) => {
  const sectionId = title?.replace(/\s+/g, '') || "default";

  
  return (
    <div
      section={sectionId}>
      {/* Tiêu đề mục phim */}
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <Swiper
        modules={[Navigation, FreeMode, Mousewheel, Keyboard, Autoplay]}
        autoplay={{ delay: 5000 }}
        freeMode={true}
        navigation={true}
        keyboard={true}
        mousewheel={{ forceToAxis: true }}
        grabCursor={true}

        // 1. CÀI ĐẶT MẶC ĐỊNH (Cho điện thoại cực nhỏ < 480px)
        slidesPerView={2.2}      // Hiện 2 phim và một chút phim thứ 3 để tạo hiệu ứng vuốt
        spaceBetween={12}       // Khoảng cách nhỏ để tiết kiệm không gian màn hình điện thoại

        breakpoints={{
          // 2. ĐIỆN THOẠI LỚN (iPhone Pro Max, Android màn to - từ 480px)
          480: {
            slidesPerView: 2.5,
            spaceBetween: 15,
          },
          // 3. TABLET (iPad, máy tính bảng - từ 640px)
          640: {
            slidesPerView: 3.2,
            spaceBetween: 20,
          },
          // 4. LAPTOP / MÀN HÌNH NHỎ (từ 768px)
          768: {
            slidesPerView: 4,
            spaceBetween: 25,     // Bắt đầu giãn cách rộng hơn
          },
          // 5. DESKTOP TIÊU CHUẨN (từ 1024px)
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,     // Khoảng cách 30px giúp nhìn rất thoáng
          },
          // 6. MÀN HÌNH LỚN / TV (từ 1280px trở lên)
          1280: {
            slidesPerView: 6,
            spaceBetween: 35,     // Giãn cách rộng nhất để tận dụng màn hình to
          },
        }}
      >
        {movieList && movieList.map((item) => (
          <SwiperSlide key={item.id}>
            <MovieCard movie={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default MovieSection;