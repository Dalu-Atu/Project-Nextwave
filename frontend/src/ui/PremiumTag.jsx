import styled from 'styled-components';

const StyledPremiumTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  border-radius: var(--border-radius-sm);
  border-style: none;
  background: var(--secondary-color);
  color: var(--primary-color);
`;
function PremiumTag() {
  return <StyledPremiumTag>Premium</StyledPremiumTag>;
}

export default PremiumTag;
