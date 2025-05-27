import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBackBtn = styled.div`
  position: absolute;
  padding: 2rem;
  z-index: 1;
  svg {
    font-size: 2rem;
    cursor: pointer;
  }
`;
function BackButton() {
  const navigate = useNavigate();
  return (
    <StyledBackBtn>
      <BsArrowLeft onClick={() => navigate(-1)} />
    </StyledBackBtn>
  );
}

export default BackButton;
