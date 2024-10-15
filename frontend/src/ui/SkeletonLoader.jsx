import styled, { keyframes } from "styled-components";

// Define the shimmer animation
const placeholderShimmer = keyframes`
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
`;

// Styled component for the skeleton loader
const Skeleton = styled.div`
  min-width: 200px;
  min-height: 200px;
  width: 100%; /* Occupies full width of the grid cell */
  aspect-ratio: 1.5 / 2; /* Keep the card aspect ratio */
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  color: var(--primary-color);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05); /* Add hover effect */
  }
  @media (max-width: 768px) {
    min-width: 150px;
  }
  @media (max-width: 500px) {
    min-width: 110px;
  }

  border-radius: ${(props) => (props.variant === "circle" ? "50%" : "2px")};
  min-width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "20px"};
  background-color: #1c1c1c; /* Slightly lighter than the background */
  background-size: 1000px 1000px;
  background-image: linear-gradient(
    100deg,
    #2a2a2a 20%,
    /* Lighter grey */ #3a3a3a 50%,
    /* Middle grey */ #2a2a2a 60%
  );
  animation: ${placeholderShimmer} 1.5s linear infinite forwards;
`;

// Usage
const SkeletonLoader = ({ width, height, variant }) => {
  return <Skeleton width={width} height={height} variant={variant} />;
};

export default SkeletonLoader;
