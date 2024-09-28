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
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  margin-right: 0.5rem;
  padding-top: 40px;
  border-radius: ${(props) => (props.variant === "circle" ? "50%" : "2px")};
  border-radius: 2px;
  display: inline-block;
  line-height: 100%;
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
