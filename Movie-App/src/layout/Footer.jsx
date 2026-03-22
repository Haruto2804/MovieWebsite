import { FaGithub, FaFacebook, FaEnvelope, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-7 footer p-8 text-gray-300 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Cột 1: Brand/Tên */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="text-2xl font-bold text-white tracking-widest">HARUTO</h2>
          <p className="text-sm text-gray-500">© 2026 Haruto. All rights reserved.</p>
        </div>

        {/* Cột 2: Social Media */}
        <div className="flex gap-6 text-2xl">
          <a 
            href="https://github.com/Haruto2804" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-white transition-colors duration-300"
            title="GitHub"
          >
            <FaGithub />
          </a>
          
          <a 
            href="https://www.facebook.com/baodaydunglo" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-blue-500 transition-colors duration-300"
            title="Facebook"
          >
            <FaFacebook />
          </a>

          <a 
            href="https://www.tiktok.com/@haruto_2804" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-pink-500 transition-colors duration-300"
            title="TikTok"
          >
            <FaTiktok />
          </a>

          <a 
            href="mailto:ngobao.software@gmail.com" 
            className="hover:text-red-400 transition-colors duration-300"
            title="Gmail"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Cột 3: Trạng thái dự án */}
        <div className="text-sm text-gray-500">
          <p>Built with <span className="text-cyan-400">React</span> & <span className="text-yellow-400">OMDb API</span></p>
        </div>

      </div>
    </footer>
  );
};
export default Footer;