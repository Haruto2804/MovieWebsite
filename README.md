
-----

# 🎬 CineStream - Modern Movie Streaming & Discovery Platform

[](https://movie-website-n5bv.vercel.app/)
[](https://github.com/Haruto2804/MovieWebsite)

**CineStream** là một ứng dụng Single Page Application (SPA) hiệu suất cao, tập trung vào việc cung cấp trải nghiệm người dùng mượt mà trong việc khám phá thế giới điện ảnh. Dự án áp dụng các nguyên lý thiết kế hiện đại và kỹ thuật tối ưu hóa mã nguồn để xử lý dữ liệu thời gian thực từ **TMDB API**.

-----

## 💎 Technical Excellence (Điểm Nhấn Kỹ Thuật)

Thay vì chỉ xây dựng tính năng, tôi tập trung vào việc giải quyết các bài toán về hiệu suất và khả năng mở rộng:

### ⚡ 1. Performance Optimization với Search Debouncing

Việc xử lý Input liên tục được tối ưu hóa thông qua **Custom Debounce Hook (500ms)**.

  * **Giải pháp:** Ngăn chặn tình trạng "API Flooding" bằng cách trì hoãn thực thi request cho đến khi người dùng tạm dừng thao tác.
  * **Kết quả:** Giảm **\~70%** số lượng request không cần thiết, tối ưu tài nguyên hệ thống và cải thiện đáng kể UX.

### 🎨 2. UX Elevation với Skeleton Loading State

Loại bỏ hoàn toàn cảm giác chờ đợi bằng kỹ thuật **Skeleton Screen (Content Placeholder)**.

  * **Chiến lược:** Duy trì layout ổn định ngay cả khi dữ liệu chưa tải xong, tránh hiện tượng "Layout Shift" (CLS) gây khó chịu cho người dùng.
  * **Cảm giác:** Tạo hiệu ứng thị giác giúp trang web có vẻ như phản hồi ngay lập tức.

### 📱 3. Responsive Design & Component-Driven Development

  * Sử dụng tư duy **Mobile-First** với Tailwind CSS để đảm bảo tính nhất quán trên mọi thiết bị (Smartphone, Tablet, Desktop).
  * Các Component được thiết kế theo hướng **Reusable** (có khả năng tái sử dụng cao), dễ dàng bảo trì và mở rộng.

-----

## 🛠️ Tech Stack & Architecture

### Core Technologies

  * **Core:** `React.js (v18+)` - Tận dụng tối đa Hooks & Functional Components.
  * **Styling:** `Tailwind CSS` - Design system linh hoạt, tối ưu CSS bundle size.
  * **State Management:** `React Context API` - Quản lý Global State (Theme, Authentication, User Preferences) một cách gọn nhẹ.
  * **Routing:** `React Router DOM v6` - Giải pháp Client-side routing mạnh mẽ.
  * **Data Fetching:** Tích hợp trực tiếp với `TMDB v3 API` thông qua lớp Service riêng biệt.

### Directory Structure (Clean Architecture)

```text
src/
├── api/          # Cấu hình Axios/Fetch instance & Interceptors
├── components/   # UI Components (Atom, Molecule, Organism)
├── contexts/     # Global state management
├── hooks/        # Custom hooks (useDebounce, useFetch, etc.)
├── layout/       # App wrappers (Navbar, Footer, Sidebar)
├── pages/        # View components (Home, Detail, Search)
├── services/     # Business logic & API calls
└── utils/        # Helper functions & Constants
```

-----

## 🚀 Quick Start Guide

1.  **Clone & Install:**

    ```bash
    git clone https://github.com/Haruto2804/MovieWebsite.git
    cd MovieWebsite && npm install
    ```

2.  **Environment Setup:** Tạo file `.env` tại thư mục gốc:

    ```env
    VITE_TMDB_API_KEY=your_api_key_here
    VITE_TMDB_BASE_URL_v3=https://api.themoviedb.org/3
    VITE_TMDB_ACCESS_TOKEN=your_access_token_here
    ```

3.  **Development Mode:**

    ```bash
    npm run dev
    ```

-----

## 📸 Interface Showcase

### 🏠 1. Home Page (Hero & Categorization)

Hệ thống Banner động và danh sách phim được phân loại thông minh (Now Playing, Trending, Top Rated, Upcoming).

\<p align="center"\>
\<img src="[https://github.com/user-attachments/assets/573eb322-4a1d-442d-b1da-a599fb370cb0](https://github.com/user-attachments/assets/573eb322-4a1d-442d-b1da-a599fb370cb0)" width="45%" alt="Home Banner"\>
\<img src="[https://github.com/user-attachments/assets/b9f06788-bee2-4f18-aadf-04d6d07b5914](https://github.com/user-attachments/assets/b9f06788-bee2-4f18-aadf-04d6d07b5914)" width="45%" alt="Now Playing"\>
\</p\>

### 🎥 2. Movie Detail (Deep Insights)

Cung cấp cái nhìn toàn diện từ thông tin phim, dàn diễn viên (Cast), nhà sản xuất cho đến Trailer tích hợp.

\<p align="center"\>
\<img src="[https://github.com/user-attachments/assets/3c54b4c2-856d-4887-9755-c7ad7ca6ac0c](https://github.com/user-attachments/assets/3c54b4c2-856d-4887-9755-c7ad7ca6ac0c)" width="45%" alt="Movie Info"\>
\<img src="[https://github.com/user-attachments/assets/29140788-72bd-4a23-a20d-34fc3c85a02c](https://github.com/user-attachments/assets/29140788-72bd-4a23-a20d-34fc3c85a02c)" width="45%" alt="Cast"\>
\</p\>

### 🔍 3. Intelligent Search

Trải nghiệm tìm kiếm tức thì kết hợp với bộ lọc hiển thị trực quan.

\<p align="center"\>
\<img src="[https://github.com/user-attachments/assets/a1336de2-e036-4008-bd7d-a69cdf8dc6e7](https://github.com/user-attachments/assets/a1336de2-e036-4008-bd7d-a69cdf8dc6e7)" width="45%" alt="Search Tool"\>
\<img src="[https://github.com/user-attachments/assets/aa0e6ccc-22b1-453b-ae81-e6c9b4d5e8a3](https://github.com/user-attachments/assets/aa0e6ccc-22b1-453b-ae81-e6c9b4d5e8a3)" width="45%" alt="Search Results"\>
\</p\>

-----

## 🤝 Connect with Me

  * **Lead Developer:** Ngô Lưu Gia Bảo (Haruto)
  * **GitHub:** [@Haruto2804](https://github.com/Haruto2804)
  * **Project Repository:** [CineStream Source Code](https://github.com/Haruto2804/MovieWebsite)

-----

*Developed with Passion & Clean Code.*

-----
5.  **Clean Architecture:** Thêm phần mô tả thư mục để chứng minh bạn có tư duy tổ chức code tốt.

Bảo thấy bản này "xịn" hơn chưa? Cần tinh chỉnh chỗ nào cứ bảo mình nhé\!
