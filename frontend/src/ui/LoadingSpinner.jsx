import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for spinning and pulsing animations
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

// Styled Spinner Container
const SpinnerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column; /* Stack the spinner and text vertically */
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0f0f0f; /* Dark background for a cinematic feel */
  padding: 20px; /* Add some padding for smaller screens */
`;

// Styled Circle Element
const SpinnerCircle = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.1);
  border-top: 8px solid var(--secondary-color-dar);
  border-radius: 50%;
  width: 15vw; /* Use vw for responsive width */
  height: 15vw; /* Use vw for responsive height */
  max-width: 80px; /* Set a max width for larger screens */
  max-height: 80px; /* Set a max height for larger screens */
  animation: ${spin} 1.2s linear infinite;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -12%;
    left: -12%;
    width: 50%; /* Use percentage for responsiveness */
    height: 50%; /* Use percentage for responsiveness */
    border-radius: 50%;
    background: var(--secondary-color-dark);
    opacity: 0.3;
    animation: ${pulse} 2s infinite;
  }
`;

// Loading Text
const LoadingText = styled.p`
  /* color: var(--secondary-color-dark); */
  font-size: 2.5vw; /* Use vw for responsive font size */
  margin-top: 20px;
  font-family: "Roboto", sans-serif;
  text-align: center;
  max-font-size: 1.5rem; /* Set a max font size for larger screens */
`;

// Loading Spinner Component
const LoadingSpinner = ({ msg }) => {
  return (
    <SpinnerContainer>
      <SpinnerCircle />
      <LoadingText>{msg || "Loading Movies..."}</LoadingText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
