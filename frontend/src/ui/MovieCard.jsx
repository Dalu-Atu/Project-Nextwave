import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PlayButton from "./PlayButton";

export const StyledCard = styled(Link)`
  min-width: 200px;
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
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CardTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  font-size: 1rem;
  text-align: center;
  color: white;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export function Card({ to, children }) {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  return (
    <StyledCard
      to={to}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {active && <PlayButton />}
      {children}
    </StyledCard>
  );
}
