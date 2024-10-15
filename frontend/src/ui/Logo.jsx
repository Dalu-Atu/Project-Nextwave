import styled from "styled-components";
import { keyframes } from "styled-components";
import logoIcon from "../assets/logo.png";

const StyledLogoContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StyledLogo = styled.h1`
  letter-spacing: 1px;
  background: var(--secondary-color);
  position: relative;
  top: 4px;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bolder;
  font-family: var(--primary-font-serif);
  @media (max-width: 768px) {
    font-size: x-large;
  }
`;
const LogoImage = styled.img`
  height: 50px;
  width: 50px;
`;
function Logo() {
  return (
    <StyledLogoContainer>
      <LogoImage src={logoIcon} />
      <StyledLogo>NextWave</StyledLogo>
    </StyledLogoContainer>
  );
}

export default Logo;
