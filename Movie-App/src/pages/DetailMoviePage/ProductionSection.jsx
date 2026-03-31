import ProductionCard from "../../components/common/ProductionCard";

const ProductionSection = ({ companies = [] }) => {
  if (!companies || companies.length === 0) return null;

  return (
    <section className="my-16 px-4">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-bold text-2xl text-white/80 tracking-tight uppercase">
          Production
        </h2>
        <div className="h-px flex-1 bg-zinc-800/50"></div>
      </div>

      {/* Grid: 2 cột mobile, 3 cột tablet, 4 cột desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {companies.map((company) => (
          <ProductionCard key={company.id} company={company} />
        ))}
      </div>
    </section>
  );
};

export default ProductionSection;