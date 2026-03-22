import RatingCard from "../../components/common/RatingCard";

const RatingSection = ({ ratingList = [] }) => { // 1. Đổi "" thành []
  return (
    <section className="my-8">
      <h2 className="font-bold text-3xl text-white mb-6 border-l-4 border-amber-500 pl-4">
        Ratings
      </h2>
      
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 place-items-stretch">
        {ratingList && ratingList.length > 0 ? (
          ratingList.map((item, index) => (
            <RatingCard
              key={index} 
              source={item.Source || item.source} 
              value={item.Value || item.value}
            />
          ))
        ) : (
          <p className="text-gray-500 italic">No rating information available.</p>
        )}
      </div>
    </section>
  );
};

export default RatingSection;