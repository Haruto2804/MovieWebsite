// src/services/authService.js

import axios from "axios";

class AuthService {
  #apiKey
  #baseUrl
  constructor() {
    this.#apiKey = import.meta.env.VITE_TMDB_API_KEY;
    //  this.#baseUrl = import.meta.env.VITE_TMDB_BASE_URL_v3;
     this.#baseUrl = import.meta.env.VITE_TMDB_BASE_URL_v4;
  }
  async getRequestToken() {
    try {
      const currentOrigin = window.location.origin;
      //v4
      // const response = await axios.post(
      //   `${this.#baseUrl}/auth/request_token`,
      //   { "redirect_to": `${currentOrigin}/approve` },
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      //       'Content-Type': 'application/json',
      //       'accept': 'application/json'
      //     }
      //   }
      // );
      const response  = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.#apiKey}`);
      return response.data.request_token;
    } catch (error) {
      console.error("Lỗi lấy Request Token:", error.response?.data || error.message);
      return null;
    }
  }
  async login() {
    try {
      // B1: tạo request token
      const request_token = await this.getRequestToken();

       const currentOrigin = window.location.origin;
       const redirectUrl = encodeURIComponent(`${currentOrigin}/approve`);
      if (request_token) {
        //v4
        // window.location.href = `https://www.themoviedb.org/auth/access?request_token=${request_token}`; 
        //v3
        window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${redirectUrl}`;
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  //create Session with v3
  async createSession() {
    const urlParams = new URLSearchParams(window.location.search);
    const isApproved = urlParams.get('approved');
    const requestToken = urlParams.get('request_token');;
    if (isApproved === 'true' && requestToken) {
      try {
        const response = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${this.#apiKey}`, {
          request_token: requestToken
        })
        if (response.data.success) {
          localStorage.setItem('tmdb_session_id', response.data.session_id);
          return response.data.session_id;
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  async logout() {
    try {
      const rawSessionId = localStorage.getItem('tmdb_session_id');
      if (!rawSessionId) return true;
      const sessionId = JSON.parse(rawSessionId);
      const response = await axios.delete(
        `https://api.themoviedb.org/3/authentication/session?api_key=${this.#apiKey}`,
        {
          data: { session_id: sessionId }
        }
      );
      localStorage.removeItem('user_details');
      localStorage.removeItem('tmdb_session_id');
      alert("Đăng xuất thành công!");
      return response.data.success;
    }
    catch (err) {
      // Nếu lỗi (ví dụ session hết hạn sẵn), vẫn nên xóa local để user thoát ra được
      localStorage.removeItem('user_details');
      localStorage.removeItem('tmdb_session_id');
      console.error("Logout Error:", err);
      return false;
    }
  }

  async getAccountDetail(sessionId) {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/account?api_key=${this.#apiKey}&session_id=${sessionId}`);
      return response.data;
    }
    catch (err) {
      console.log(err);
    }
  }

}

export default new AuthService();