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
        autoplay={ {delay: 5000}}
        freeMode={true}
        navigation={true}
        keyboard={true}
        mousewheel={{ forceToAxis: true }}
        pagination={{ clickable: true }}
        spaceBetween={13}       // Khoảng cách giữa các phim là 20px
        slidesPerView={2}       // Điện thoại hiện 2 phim
        breakpoints={{
          // 2. TABLET (Màn hình từ 640px trở lên)
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // 3. LAPTOP NHỎ (Màn hình từ 768px trở lên)
          768: {
            slidesPerView: 3,
            spaceBetween: 2,
          },
          // 4. DESKTOP TIÊU CHUẨN (Màn hình từ 1024px trở lên)
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          // 5. MÀN HÌNH LỚN / TV (Màn hình từ 1280px trở lên)
          1280: {
            slidesPerView: 6,
            spaceBetween: 40, // Khoảng cách rộng 40px như bạn muốn
          },
        }}
        grabCursor={true}
      >
        {/* BƯỚC QUAN TRỌNG: Duyệt qua mảng movieList */}
        {movieList && movieList.map((item) => (
          <SwiperSlide key={item.imdbID}>
            {/* Mỗi bộ phim sẽ nằm gọn trong 1 SwiperSlide */}
            <MovieCard movie={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default MovieSection;