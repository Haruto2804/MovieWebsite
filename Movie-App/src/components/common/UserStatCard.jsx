// src/components/UserStatCard.jsx

const UserStatCard = ({ icon, value, title, colorClass = "text-blue-400" }) => {
  return (
    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex items-center gap-4 hover:bg-slate-750 transition-all cursor-default">
      {/* 1. Phần Icon hiển thị status */}
      <div className={`text-3xl ${colorClass}`}>
        {icon}
      </div>

      <div>
        {/* 2. Thông số status */}
        <h3 className="text-2xl font-bold text-white leading-none">
          {value}
        </h3>
        
        {/* 3. Title của status */}
        <p className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-wider">
          {title}
        </p>
      </div>
    </div>
  );
};

export default UserStatCard;