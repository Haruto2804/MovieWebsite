const Label = ({ labelName = 'Default', className = '' }) => {
  return (
    <div className={`
      flex items-center 
      w-fit 
      px-3 py-1 
      rounded-md 
      bg-white/10 
      backdrop-blur-sm 
      border-l-4 border-l-cine-red
      ${className}
    `}>
      <span className="text-white text-xs font-bold uppercase tracking-wider">
        {labelName}
      </span>
    </div>
  );
};

export default Label;