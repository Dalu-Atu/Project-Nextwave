import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PlayButton from "./PlayButton";

export const StyledCard = styled(Link)`
  width: 100%;
  min-width: 200px;
  max-width: 200px; /* Wider max width for larger screens */
  height: auto; /* Let height adjust automatically based on content */
  aspect-ratio: 1.5 / 2;
  margin: 0.4rem;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  color: var(--primary-color);
  margin-top: 1rem;
  z-index: 1;
  /* border: 2px solid yellow; */

  &:hover:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: background 0.3s ease;
    background: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 1024px) {
    max-width: 220px; /* Make the card wider on tablets */
    min-width: 220px;
  }

  @media (max-width: 768px) {
    max-width: 150px; /* Adjust width for mobile landscape */
    min-width: 150px;
  }

  @media (max-width: 480px) {
    max-width: 130px; /* Adjust width for mobile portrait */
    min-width: 130px;
  }
`;

export const CardImage = styled.img`
  width: 100%; /* Fully responsive */
  height: 100%;
  object-fit: cover; /* Keeps image proportional */
  position: relative;
`;

export const CardTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7); /* Background for readability */
  padding: 10px;
  font-size: 1rem;
  text-align: center;
  color: white;
  z-index: 2;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Slightly smaller font for mobile landscape */
  }

  @media (max-width: 480px) {
    font-size: 0.8rem; /* Small font for mobile portrait */
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
