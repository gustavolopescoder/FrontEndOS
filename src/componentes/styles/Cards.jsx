export default function Card({ children, className = "", style = {} }) {
  return (
    <div className={`p-4 w-auto h-auto ${className}`} style={style}>
      {children}
    </div>
  );
}
