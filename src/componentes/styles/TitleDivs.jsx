export default function TitleDivs({ children }) {
  return (
    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-background">
      {children}
    </h1>
  );
}
