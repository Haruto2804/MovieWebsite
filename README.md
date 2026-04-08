
-----

# 🎬 CineStream - Movie Streaming & Discovery Platform

**CineStream** là một ứng dụng web hiện đại giúp người dùng khám phá thế giới điện ảnh một cách nhanh chóng và mượt mà. Dự án sử dụng dữ liệu từ **TMDB API** và được tối ưu hóa về mặt hiệu suất cũng như trải nghiệm người dùng (UX).

-----

## ✨ Điểm Nổi Bật Về Kỹ Thuật

Dự án không chỉ là một trang hiển thị dữ liệu mà còn áp dụng các kỹ thuật tối ưu hóa lập trình chuyên sâu:

### 🔍 1. Tối ưu tìm kiếm với Debounce

Thay vì gửi hàng chục yêu cầu (request) lên Server mỗi khi người dùng nhập từng ký tự, tôi đã triển khai kỹ thuật **Debounce (500ms)**.

  * **Cơ chế:** Hệ thống sẽ đợi người dùng ngừng nhập trong 500ms trước khi thực hiện lệnh gọi API.
  * **Lợi ích:** Giảm tải cho API, tiết kiệm băng thông và giúp giao diện phản hồi mượt mà.

### 📱 2. Thiết kế Responsive toàn diện

Giao diện được xây dựng bằng **Tailwind CSS** với tư duy "Mobile First":

  * Tương thích hoàn hảo trên mọi kích thước màn hình: Smartphone, Tablet và Desktop.

### 🧊 3. Trải nghiệm tải trang với Skeleton Screen

Thay vì các vòng xoay (Loading Spinner) gây nhàm chán, CineStream sử dụng **Skeleton Screen**.

  * **Cảm giác:** Tạo cảm giác trang web "tải nhanh hơn" bằng cách hiển thị khung xương nội dung trước khi dữ liệu thật xuất hiện.

-----

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

  * **Frontend Framework:** `React.js`
  * **Styling:** `Tailwind CSS`
  * **Data Source:** `TMDB API`
  * **Routing:** `React Router DOM`
  * **State Management:** `React Context API`
  * **Libraries:** `Swiper.js`, `Lucide React`, `Font Awesome`
  * **Deployment:** `Vercel`

-----

## 📂 Cấu Trúc Thư Mục (Folder Structure)

```text
src/
├── api/         # Quản lý cấu hình Axios và các endpoint gọi từ TMDB
├── components/  # Các thành phần UI tái sử dụng (MovieCard, MovieBanner, Skeleton)
├── contexts/    # Quản lý trạng thái toàn cục (Favorite & Watchlist)
├── hooks/       # Các Custom Hooks xử lý logic riêng (Debounce, Pagination)
├── layout/      # Định nghĩa khung trang (Header, Footer, Responsive Layout)
├── pages/       # Chứa các trang chính (Home, Movie Detail, Search, UserPage)
├── services/    # Xử lý logic nghiệp vụ và xác thực (Auth)
└── util.js      # Chứa các hàm hỗ trợ định dạng dữ liệu
```

-----

## 🚀 Hướng Dẫn Cài Đặt

1.  **Clone dự án:**
    ```bash
    git clone https://github.com/Haruto2804/MovieWebsite.git
    ```
2.  **Cài đặt thư viện:**
    ```bash
    npm install
    ```
3.  **Cấu hình biến môi trường:** Tạo file `.env` tại thư mục gốc và dán mã:
    ```env
    VITE_TMDB_API_KEY=your_api_key_here
    VITE_TMDB_BASE_URL_v3=https://api.themoviedb.org/3
    VITE_TMDB_ACCESS_TOKEN=your_access_token_here
    ```
4.  **Chạy dự án:**
    ```bash
    npm run dev
    ```

-----

## 📸 Tổng Quan Giao Diện & Tính Năng

### 🏠 1. Giao diện Trang chủ (Home Page)

Giao diện trang chủ được thiết kế hiện đại, tối ưu trải nghiệm người dùng.

  * **Banner Phim Nổi Bật (Hero Section):**

\<img src="[https://github.com/user-attachments/assets/573eb322-4a1d-442d-b1da-a599fb370cb0](https://github.com/user-attachments/assets/573eb322-4a1d-442d-b1da-a599fb370cb0)" width="100%" alt="Home Banner"\>

  * **Đang chiếu (Now Playing):**

\<img src="[https://github.com/user-attachments/assets/b9f06788-bee2-4f18-aadf-04d6d07b5914](https://github.com/user-attachments/assets/b9f06788-bee2-4f18-aadf-04d6d07b5914)" width="100%" alt="Now Playing"\>

  * **Phổ biến (Trending/Popular):**

\<img src="[https://github.com/user-attachments/assets/d630b138-3aac-47b9-acc1-c8d693d91cdd](https://github.com/user-attachments/assets/d630b138-3aac-47b9-acc1-c8d693d91cdd)" width="100%" alt="Trending"\>

  * **Được yêu thích nhất (Top Rated):**

\<img src="[https://github.com/user-attachments/assets/ba9214ec-bc71-42d4-af08-f5675174c8b2](https://github.com/user-attachments/assets/ba9214ec-bc71-42d4-af08-f5675174c8b2)" width="100%" alt="Top Rated"\>

  * **Phim sắp chiếu (Upcoming):**

\<img src="[https://github.com/user-attachments/assets/248eb207-a892-42dc-afde-a59b6ec074a4](https://github.com/user-attachments/assets/248eb207-a892-42dc-afde-a59b6ec074a4)" width="100%" alt="Upcoming"\>

-----

### 🎥 2. Giao diện Trang chi tiết phim (Detail Movie Page)

Trang chi tiết cung cấp cái nhìn toàn diện về tác phẩm điện ảnh.

  * **Phông nền & Thông tin tổng quan:**

\<img src="[https://github.com/user-attachments/assets/3c54b4c2-856d-4887-9755-c7ad7ca6ac0c](https://github.com/user-attachments/assets/3c54b4c2-856d-4887-9755-c7ad7ca6ac0c)" width="100%" alt="Movie Info"\>

  * **Dàn diễn viên (Cast & Crew):**

\<img src="[https://github.com/user-attachments/assets/29140788-72bd-4a23-a20d-34fc3c85a02c](https://github.com/user-attachments/assets/29140788-72bd-4a23-a20d-34fc3c85a02c)" width="100%" alt="Cast"\>

  * **Nhà sản xuất & Trailer:**

\<img src="[https://github.com/user-attachments/assets/4551cd50-acd6-480c-a4b1-37da2f93e86d](https://github.com/user-attachments/assets/4551cd50-acd6-480c-a4b1-37da2f93e86d)" width="100%" alt="Production"\>
<br>
\<img src="[https://github.com/user-attachments/assets/53a90b1e-b35f-495a-8d13-7c3dee79f9cb](https://github.com/user-attachments/assets/53a90b1e-b35f-495a-8d13-7c3dee79f9cb)" width="100%" alt="Trailer"\>

  * **Gợi ý phim tương đương (Similar Movies):**

\<img src="[https://github.com/user-attachments/assets/315e5369-5a0c-4a80-b8f7-90aa5e43e11b](https://github.com/user-attachments/assets/315e5369-5a0c-4a80-b8f7-90aa5e43e11b)" width="100%" alt="Similar Movies"\>

-----

### 🔍 3. Giao diện Tìm kiếm thông minh (CineSearch Page)

  * **Bộ công cụ tìm kiếm & Kết quả:**

\<img src="[https://github.com/user-attachments/assets/a1336de2-e036-4008-bd7d-a69cdf8dc6e7](https://github.com/user-attachments/assets/a1336de2-e036-4008-bd7d-a69cdf8dc6e7)" width="100%" alt="Search Tool"\>
<br>
\<img src="[https://github.com/user-attachments/assets/aa0e6ccc-22b1-453b-ae81-e6c9b4d5e8a3](https://github.com/user-attachments/assets/aa0e6ccc-22b1-453b-ae81-e6c9b4d5e8a3)" width="100%" alt="Search Results"\>

-----

## 🤝 Liên hệ

  * **Tác giả:** Ngô Lưu Gia Bảo (Haruto)
  * **GitHub:** [@Haruto2804](https://www.google.com/search?q=https://github.com/Haruto2804)
  * **Dự án:** [CineStream](https://www.google.com/search?q=https://github.com/Haruto2804/MovieWebsite)
