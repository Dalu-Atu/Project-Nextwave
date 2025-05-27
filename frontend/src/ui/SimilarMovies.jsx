import styled from "styled-components";
import { Card, CardImage, CardTitle } from "./MovieCard";
import SkeletonLoader from "./SkeletonLoader";

const StyledSimilarMovies = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* Minimum card size, max flexible */
  gap: 19px; /* Adjust space between cards */
  padding: 10px;
  background-color: var(--color-bg);

  overflow-y: auto;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(150px, 1fr)
    ); /* Minimum card size, max flexible */
  }
  @media (max-width: 500px) {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(100px, 1fr)
    ); /* Minimum card size, max flexible */
  }
`;

function SimilarMovies({ loading, movies }) {
  return (
    <>
      <StyledSimilarMovies>
        {loading
          ? Array(10)
              .fill()
              .map((_, index) => (
                <Card key={index}>
                  <SkeletonLoader width="200px" height="300px" />
                </Card>
              ))
          : movies?.map((movie) => (
              <Card to={`/movie/${movie.title}`} key={movie._id}>
                <CardImage
                  src={`${import.meta.env.VITE_TMDB_POSTER}${movie.poster}`}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.onerror = null; // prevents looping
                    e.target.src = movie.image;
                  }}
                />
                <CardTitle>{movie.title}</CardTitle>
              </Card>
            ))}
      </StyledSimilarMovies>
    </>
  );
}

export default SimilarMovies;
