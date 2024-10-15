import styled from "styled-components";
import { Card, CardImage, CardTitle } from "../ui/MovieCard";
import NavContainer from "../ui/NavContainer";
import { useParams } from "react-router-dom";
import { useGetGenre, useGetMoviesSeries } from "../../services/movies";
import LoadingSpinner from "../ui/LoadingSpinner";

const MovieContainer = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* Minimum card size, max flexible */
  gap: 19px; /* Adjust space between cards */
  padding: 10px;
  background-color: var(--color-bg);
  overflow-x: hidden;
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

const SectionLabel = styled.p`
  font-style: larger;
  color: #b3b3b3;
  position: relative;
  top: 0.7rem;
  left: 1.4rem;
  width: fit-content;
`;
const MediaDisplay = ({ type }) => {
  const { genre } = useParams();
  let movies = [];

  // Always call both hooks, but decide which data to use based on logic
  const { isLoading: genreLoading, data: genreData } = useGetGenre(genre);
  const { isLoading: moviesLoading, data: moviesData } = useGetMoviesSeries(
    type === "movies" ? "International" : "TV Series"
  );

  // Conditionally choose which data to use
  if (genre) {
    movies = genreData || [];
  } else if (type) {
    movies = moviesData || [];
  }

  // Combine all loading states
  const isLoading = genreLoading || moviesLoading;

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <NavContainer />
      <SectionLabel>{genre || type || ""}</SectionLabel>
      <MovieContainer>
        {movies.map((movie) => (
          <Card
            to={`/movie/${movie.title}`}
            key={`media-display-${movie?._id}`}
          >
            <CardImage
              src={
                `${import.meta.env.VITE_TMDB_POSTER}${movie.poster}` ||
                movie.image
              }
              alt={movie.title}
            />
            <CardTitle>{movie.title}</CardTitle>
          </Card>
        ))}
      </MovieContainer>
    </>
  );
};

export default MediaDisplay;
