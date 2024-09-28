import styled from "styled-components";
import image from "../assets/duneposter.webp";
import image1 from "../assets/home.jpg";
import image2 from "../assets/Trigger.jpg";
import image3 from "../assets/download.jfif";
import { Card, CardImage, CardTitle } from "./MovieCard";
import SkeletonLoader from "./SkeletonLoader";

const StyledSimilarMovies = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;
  /* border: 1px solid red; */
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
              <Card to={`/movie/${movie.title}`} key={movie.id}>
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
