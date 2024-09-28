import styled from "styled-components";

const StyledLogo = styled.h1`
  letter-spacing: 1px;
  background: linear-gradient(90deg, #28d5a7, #00aa6c);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bolder;
  font-family: var(--primary-font-serif);
`;
function Logo() {
  return <StyledLogo>NextWave</StyledLogo>;
}

export default Logo;
