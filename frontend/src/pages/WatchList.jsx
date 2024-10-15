import styled from "styled-components";
import NavContainer from "../ui/NavContainer";
import { useAuth } from "../../context/AuthContext";
import { StyledCard, CardImage, CardTitle } from "../ui/MovieCard";

const StyledWatchList = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 19px;
  padding: 10px;
  background-color: var(--color-bg);
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

// Extend the StyledCard to add a watermark for WatchList cards
const WatchListCard = styled(StyledCard)`
  position: relative;

  &::before {
    content: "WATCHLISED";

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: inherit;
    letter-spacing: 1px;
    background: var(--secondary-color);
    -webkit-background-clip: text;
    color: transparent;
    font-weight: bolder;
    pointer-events: none;
    z-index: 2;
    white-space: nowrap;
  }
`;

function WatchList() {
  const { user } = useAuth();
  const watchListItems = user.watchlist;

  return (
    <>
      <NavContainer />
      <StyledWatchList>
        {watchListItems?.map((watchlisted, i) => (
          <WatchListCard
            to={`/movie/${watchlisted.title}`}
            key={`media-display-${watchlisted?._id}`}
          >
            <CardImage
              src={
                `${import.meta.env.VITE_TMDB_POSTER}${watchlisted.poster}` ||
                watchlisted.image
              }
              alt={watchlisted.title}
            />
            <CardTitle>{watchlisted.title}</CardTitle>
          </WatchListCard>
        ))}
      </StyledWatchList>
    </>
  );
}

export default WatchList;
