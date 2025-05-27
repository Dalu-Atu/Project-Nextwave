import styled from "styled-components";

const StyledPremiumTag = styled.div`
  font-size: small;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  border-radius: var(--border-radius-sm);
  padding: 0.2rem 0.3rem;
  width: fit-content;
  border-style: none;
  background: var(--secondary-color-reverse);
  font-weight: 1000;
  color: white !important;
`;
function PremiumTag() {
  return <StyledPremiumTag>PREMIUM</StyledPremiumTag>;
}

export default PremiumTag;
