import styled from "styled-components";
import PreveiewMovieRecomendation, {
  Recomendation,
} from "../ui/PreveiewMovieRecomendation";
import NavContainer from "../ui/NavContainer";
import { useAuth } from "../../context/AuthContext";
import PlayButton from "../ui/PlayButton";
import MovieStats from "../ui/MovieStats";
import { useState } from "react";

const StyledWatchList = styled.div`
  width: inherit;
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 0px;
  justify-content: center;
  background-color: var(--color-bg);
  overflow: auto;
`;

function WatchList() {
  const { user } = useAuth();
  const watchListItems = user.watchlist;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  console.log(watchListItems);
  return (
    <>
      <NavContainer />
      <StyledWatchList>
        {watchListItems?.map((item, i) => (
          <Recomendation
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            key={i}
            to={`/movie/${item.title}`}
          >
            <div className="recomendation-img">
              <img
                src={
                  `${import.meta.env.VITE_TMDB_POSTER}${item?.poster}` ||
                  item?.image
                }
                onError={(e) => {
                  e.target.onerror = null; // prevents looping
                  e.target.src = item?.image;
                }}
                alt={item.id}
              />
              {hoveredIndex === i && <PlayButton />}
            </div>
            <div className="recomendation-content">
              <h3>{item.title}</h3>
              <MovieStats />
            </div>
          </Recomendation>
        ))}
      </StyledWatchList>
    </>
  );
}

export default WatchList;
