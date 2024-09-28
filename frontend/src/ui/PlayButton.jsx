import { FaPlay } from "react-icons/fa";
import styled from "styled-components";

const PlayBtn = styled.div`
  position: absolute;
  bottom: 45%;
  left: 40%;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  font-size: 16px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 3;
`;
function PlayButton({ movieToPlay }) {
  return (
    <PlayBtn>
      <FaPlay size={"30px"} />
    </PlayBtn>
  );
}

export default PlayButton;
