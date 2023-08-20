import styles from './Ellipse.module.scss';

export const Ellipse = ({ blue = false, green = false }) => {
  const className = [
    styles.ellipse
  ];

  let stopColor;

  if (green) stopColor = "#29A634";
  if (blue) stopColor = "#2D72D2";


  return (
    <svg
      className={className.join(' ')}
      viewBox="0 0 678 679"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        opacity="0.4"
        cx="339"
        cy="339.5"
        rx="339"
        ry="339.5"
        fill={`url(#${blue ? "ellipse-blue" : "ellipse-green"})`}
      />
      <defs>
        <radialGradient
          id={`${blue ? "ellipse-blue" : "ellipse-green"}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(339 339.5) rotate(90) scale(339.5 339)"
        >
          <stop stopColor={stopColor} />
          <stop offset="1" stopColor={stopColor} stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
