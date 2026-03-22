import ActorCard from "../../components/common/ActorCard";

const CastSection = ({ castList = "" }) => {


  return (
    <section className="my-8">
      <h2 className="font-bold text-3xl text-white mb-6">Cast</h2>
      
      {/* Grid: 1 cột mobile, 3 cột tablet, 4-5 cột desktop */}
      <div className=" grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 place-items-center">
        {castList.length > 0 ? (
          castList.map((name, index) => (
            <ActorCard key={index} actorName={name} />
          ))
        ) : (
          <p className="text-gray-400">No cast information available.</p>
        )}
      </div>
    </section>
  );
};

export default CastSection;