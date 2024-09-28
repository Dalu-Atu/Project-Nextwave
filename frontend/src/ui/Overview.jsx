import { FaPlay } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import SkeletonLoader from "./SkeletonLoader";

const StyledOverview = styled.div`
  margin-top: 10rem;
  margin-left: 2.5rem;

  height: max-content;
  overflow: hidden;
  padding-bottom: 1rem;
  @media (max-width: 710px) {
    margin-left: 1rem;
    width: calc(100vw - 1rem);
  }
`;
const Watch = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  color: #e0e0e0;
  position: relative;
  top: 1rem;
  z-index: 99999;

  .watch-now-btn {
    display: flex;
    align-items: center;
    width: fit-content;
    color: #e0e0e0;
    background-color: transparent;
    border-style: none;
  }
  .watch-text {
    margin-left: 0.7rem;
    margin-top: 1rem;
    @media (max-width: 700px) {
      font-size: large;
      margin-left: 0.4rem;
    }
  }

  .play-icon {
    width: 3rem;
    background: linear-gradient(90deg, #28d5a7, #00aa6c);
    height: 1.6rem;
    border-radius: 5px;
    color: #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .movie-info-btn {
    margin-left: 1.5rem;
    padding: 0.3rem 1rem;
    border-radius: 5px;
    border: none;
    color: #e0e0e0;
    background-color: rgba(224, 224, 224, 0.2);
    text-decoration: none;
    @media (max-width: 700px) {
      font-size: small;
    }
  }
`;
const MovieName = styled.p`
  color: #e0e0e0;
  margin-top: 1rem;
  font-size: xx-large;
  position: relative;
  top: 0.7rem;
  z-index: 99999;
  @media (max-width: 746px) {
    font-size: x-large;
  }
`;
const MovieDescription = styled.p`
  position: relative;
  z-index: 99999;
  color: #c2c2c2;
  margin-top: 1rem;
  max-width: 60vw;
  @media (max-width: 746px) {
    max-width: 80vw;
    display: none;
  }
  @media (max-width: 600px) {
    max-width: 95vw;
    display: none;
  }
`;
const CarouselContainer = styled.div`
  color: #828282;
  margin-top: 2.5rem;
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 99;

  @media (max-width: 767px) {
    color: var(--color-primary);
  }
  p {
    @media (max-width: 767px) {
      position: relative;
      top: 0.7rem;
    }
  }
`;
const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;
const Carousel = styled.div`
  display: flex;
  width: calc(
    350px * 16
  ); /* Double the width to fit both original and duplicate items */
  animation: ${scroll} 150s linear infinite; /* Adjust the duration as needed */
  &:hover {
    animation-play-state: paused;
  }
`;

const SuggestedMovies = styled.img`
  width: 330px;
  border: 2px solid gray;
  height: 180px;
  margin: 0rem 0.5rem;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  object-fit: cover;
  @media (max-width: 956px) {
    width: 300px;
    height: 150px;
  }
  @media (max-width: 956px) {
    width: 300px;
    height: 150px;
  }
  @media (max-width: 700px) {
    width: 250px;
    height: 120px;
  }
  @media (max-width: 500px) {
    width: 180px;
    height: 100px;
  }
`;
const GenresContainer = styled.div`
  overflow: scroll;
  display: flex;
  margin-top: 0.5rem;
  position: relative;
  z-index: 99;
`;
const MovieGenre = styled(Link)`
  height: 4rem;
  min-width: 9rem;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  color: white;
  margin: 0 1rem 0rem 0rem;
  background-color: rgba(0, 0, 0, 0.6);
  @media (max-width: 700px) {
    height: 3rem;
    min-width: 7rem;
  }
`;
const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Fantasy",
  "Family",
  "Horror",
  "Documentary",
  "Romance",
  "Horror",
  "War",
];
const InfiniteCarousel = ({ suggestions }) => {
  console.log(suggestions);
  return (
    <>
      <CarouselContainer>
        <p>Top picks for you</p>
        <Carousel>
          {suggestions.concat(suggestions).map((movie, index) => (
            <Link key={index} to={`/movie/${movie.title}`}>
              <SuggestedMovies
                src={`${import.meta.env.VITE_TMDB_IMAGE}${
                  movie?.backdropPoster || movie.VITE_TMDB_IMAGE
                }`}
                alt={`Suggested Movie ${index + 1}`}
              />
            </Link>
          ))}
        </Carousel>
      </CarouselContainer>
    </>
  );
};

function Overview({ data }) {
  // const navigate = useNavigate();
  const { mostTrendingMovie, recomendedMovies, isLoading } = data;

  return (
    <StyledOverview>
      <Watch>
        <Link
          to={`/movie/${mostTrendingMovie?.title}`}
          className="watch-now-btn"
        >
          <div className="play-icon">
            <FaPlay size={"18px"} />
          </div>
          <h2 className="watch-text">Watch Now</h2>
        </Link>
        <Link
          to={`/movie/${mostTrendingMovie?.title}`}
          className="movie-info-btn"
        >
          More info
        </Link>
      </Watch>
      {isLoading ? (
        <SkeletonLoader width={"500px"} />
      ) : (
        <MovieName>{mostTrendingMovie?.title}</MovieName>
      )}

      {isLoading ? (
        <SkeletonLoader width={"900px"} />
      ) : (
        <MovieDescription>{mostTrendingMovie?.synopsis} </MovieDescription>
      )}
      {isLoading ? (
        <SkeletonLoader height={"200px"} />
      ) : (
        <InfiniteCarousel suggestions={recomendedMovies} />
      )}

      <GenresContainer>
        {genres.map((genre, index) => (
          <MovieGenre to={`/movies/${genre}`} key={index}>
            {genre}
          </MovieGenre>
        ))}
      </GenresContainer>
    </StyledOverview>
  );
}

export default Overview;
// add a continue from where you stoped movie featur
