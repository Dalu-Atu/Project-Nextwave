import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
const StyledAllSet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  animation: ${slideInFromLeft} 0.5s ease-out forwards;
  text-align: center;
  h1 {
    margin-top: 1rem;
  }
`;
const CheckIcon = styled(FaCheckCircle)`
  font-size: 4rem;
  background: var(--secondary-color);
  border-radius: 50%;
`;

function AllSet() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard"); // Navigate to the dashboard after 2 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, []); // Empty dependency array ensures this only runs on mount

  return (
    <StyledAllSet>
      <div>
        <CheckIcon />
        <h1>You Are All Set</h1>
      </div>
    </StyledAllSet>
  );
}

export default AllSet;
