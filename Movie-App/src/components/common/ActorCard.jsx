const ActorCard = ({ actorName }) => {
  // Lấy chữ cái đầu tiên
  const firstLetter = actorName ? actorName.charAt(0).toUpperCase() : "?";

  return (
    <div className="items-center w-70 p-6 bg-[#1a1d23] rounded-2xl flex flex-col gap-4 shadow-lg transition-transform hover:scale-105 cursor-pointer">
      {/* Avatar Circle với Gradient */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff4d94] to-[#a349eb] flex items-center justify-center text-white text-2xl font-bold shadow-inner">
        {firstLetter}
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-1">
        <h4 className="text-white text-lg font-semibold truncate">
          {actorName}
        </h4>
        <p className="text-gray-500 text-sm font-medium">
          Actor
        </p>
      </div>
    </div>
  );
};
export default ActorCard;