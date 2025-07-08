export default function Title({ children }) {
  return (
    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-slate-100">
      {children}
    </h1>
  );
}
