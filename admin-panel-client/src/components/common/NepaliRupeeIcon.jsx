export default function NepaliRupeeIcon({ size = 16, color = 'currentColor', className = '', style = {} }) {
  return (
    <span
      className={`nepali-rupee-icon ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${size}px`,
        fontWeight: 800,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        lineHeight: 1,
        userSelect: 'none',
        color: color,
        ...style,
      }}
      aria-label="Nepali Rupee (Rs)"
    >
      ₨
    </span>
  );
}
