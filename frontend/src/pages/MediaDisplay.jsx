import React, { useEffect } from "react";
import styled from "styled-components";
import { Card, CardImage, CardTitle } from "../ui/MovieCard";
import NavContainer from "../ui/NavContainer";
import image from "../assets/duneposter.webp";
import image1 from "../assets/home.jpg";
import image2 from "../assets/Trigger.jpg";
import image3 from "../assets/download.jfif";
import { useParams } from "react-router-dom";
import { useGetGenre, useGetMoviesSeries } from "../../services/movies";
import SkeletonLoader from "../ui/SkeletonLoader";

const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  padding: 10px;
  justify-content: last baseline;
  background-color: var(--color-bg);
  height: 93vh;
  overflow: hidden;
  overflow-y: auto;
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

  // Hooks for fetching data based on the provided type or genre
  const { isLoading: genreLoading, data: genreData } = useGetGenre(genre);
  const { isLoading: moviesLoading, data: moviesData } = useGetMoviesSeries(
    type === "movies" ? "International" : "TV Series"
  );
  const { isLoading: seriesLoading, data: seriesData } = useGetMoviesSeries(
    type === "movies" ? "international" : "TV Series"
  );

  // Determine which data to use based on type and genre
  if (genre) {
    movies = genreData || [];
  } else if (type === "movies") {
    movies = moviesData || [];
  } else if (type === "series") {
    movies = seriesData || [];
  }

  // Combine loading states
  const isLoading = genreLoading || moviesLoading || seriesLoading;

  return (
    <>
      <NavContainer />
      <SectionLabel>{genre || type || ""}</SectionLabel>
      <MovieContainer>
        {isLoading
          ? Array(20)
              .fill()
              .map((_, index) => (
                <Card key={index}>
                  <SkeletonLoader width="200px" height="300px" />
                </Card>
              ))
          : movies.map((movie) => (
              <Card to={`/movie/${movie.title}`} key={movie.id}>
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
