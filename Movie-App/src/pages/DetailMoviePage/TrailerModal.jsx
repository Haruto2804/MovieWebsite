

const TrailerModal = ({videoId = "dQw4w9WgXcQ", isOpen,setIsOpen}) => {
  return (
    <div className="min-h-screen bg-[#0d0208] text-cine-red font-mono">
      
      {/* --- MODAL TRANG PHỤC (CHỈ HIỆN KHI ISOPEN = TRUE) --- */}
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop (Lớp nền mờ) */}
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-cine-red border border-cine-red/30 animate-in fade-in zoom-in duration-300">
            
            {/* Nút đóng */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer top-4 right-4 z-50 w-10 h-10 bg-black/50 text-cine-red hover:bg-cine-red hover:text-black rounded-full transition-all text-2xl flex items-center justify-center"
            >
              &times;
            </button>

            {/* Video Iframe chuẩn Responsive */}
            <div className="w-full aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                title="Anime Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            {/* Footer Modal */}
            <div className="p-4 bg-[#111] border-t border-white/5 flex justify-between items-center text-[15px] uppercase tracking-[0.2em]">
                <span>TRAILER</span>
                <span className="text-red-500">CINESTREAM</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer trang web */}
      <footer className="py-10 text-center text-[10px] text-gray-600">
        &copy; 2026 PROTECTED BY PUBLIC SAFETY BUREAU
      </footer>
    </div>
  );
};

export default TrailerModal;