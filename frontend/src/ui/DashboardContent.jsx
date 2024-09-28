import styled from "styled-components";
import React from "react";
import { Card, CardImage, CardTitle } from "./MovieCard";
import { StyledUpcomings, UpcomingMovieCard } from "../pages/UpcomingMovies";
import { useNewReleases } from "../../services/movies";
import SkeletonLoader from "./SkeletonLoader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
  color: #fff;
  min-height: 100vh;

  margin-top: 1rem;
`;

const Section = styled.div`
  padding: 10px;
  height: fit-content;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  margin-left: 1rem;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MoviesCategories = ({ data }) => {
  const {
    newReleases,
    trendingSeries,
    trendingMovies,
    kidsShows,
    isLoading,
    upComings,
  } = data;

  return (
    <Container>
      <Section>
        <SectionTitle> New Releases</SectionTitle>
        <Carousel>
          {isLoading
            ? Array(10)
                .fill()
                .map((_, index) => (
                  <Card key={`card-${index}`}>
                    <SkeletonLoader width="200px" height="300px" />
                  </Card>
                ))
            : newReleases.map((movie, index) => (
                <Card to={`/movie/${movie.title}`} key={`${movie.id}-${index}`}>
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
        </Carousel>
      </Section>

      <Section>
        <SectionTitle>Trending Series</SectionTitle>
        <Carousel>
          {isLoading
            ? Array(10)
                .fill()
                .map((_, index) => (
                  <Card key={`card-${index}`}>
                    <SkeletonLoader width="200px" height="300px" />
                  </Card>
                ))
            : trendingSeries.map((movie, index) => (
                <Card to={`/movie/${movie.title}`} key={`${movie.id}-${index}`}>
                  <CardImage
                    src={
                      `${import.meta.env.VITE_TMDB_POSTER}${movie.poster}` ||
                      movie.image
                    }
                    alt={movie.title}
                    onError={(e) => {
                      e.target.onerror = null; // prevents looping
                      e.target.src = movie.image;
                    }}
                  />
                  <CardTitle>{movie.title}</CardTitle>
                </Card>
              ))}
        </Carousel>
      </Section>
      <Section>
        <SectionTitle>Trending Movies</SectionTitle>
        <Carousel>
          {isLoading
            ? Array(10)
                .fill()
                .map((_, index) => (
                  <Card key={`card-${index}`}>
                    <SkeletonLoader width="200px" height="300px" />
                  </Card>
                ))
            : trendingMovies.map((movie, index) => (
                <Card to={`/movie/${movie.title}`} key={`${movie.id}-${index}`}>
                  <CardImage
                    src={
                      `${import.meta.env.VITE_TMDB_POSTER}${movie.poster}` ||
                      movie.image
                    }
                    alt={movie.title}
                    onError={(e) => {
                      e.target.onerror = null; // prevents looping
                      e.target.src = movie.image;
                    }}
                  />
                  <CardTitle>{movie.title}</CardTitle>
                </Card>
              ))}
        </Carousel>
      </Section>

      <Section>
        <SectionTitle> For Kids</SectionTitle>
        <Carousel>
          {isLoading
            ? Array(10)
                .fill(10)
                .map((_, index) => (
                  <Card key={index}>
                    <SkeletonLoader width="200px" height="300px" />
                  </Card>
                ))
            : kidsShows.map((movie, index) => (
                <Card to={`/movie/${movie.title}`} key={`${movie.id}-${index}`}>
                  <CardImage
                    src={
                      `${import.meta.env.VITE_TMDB_POSTER}${movie.poster}` ||
                      movie.image
                    }
                    alt={movie.title}
                    onError={(e) => {
                      e.target.onerror = null; // prevents looping
                      e.target.src = movie.image;
                    }}
                  />
                  <CardTitle>{movie.title}</CardTitle>
                </Card>
              ))}
        </Carousel>
      </Section>

      <Section>
        <SectionTitle>Upcomings</SectionTitle>
        <StyledUpcomings>
          {isLoading
            ? Array(10)
                .fill()
                .map((_, index) => (
                  <div key={index}>
                    <SkeletonLoader width="375px" height="250px" />
                  </div>
                ))
            : upComings.map((movie, i) => (
                <UpcomingMovieCard key={i} movie={movie}></UpcomingMovieCard>
              ))}
        </StyledUpcomings>
      </Section>
    </Container>
  );
};

function DashboardContent({ data }) {
  return <>{<MoviesCategories data={data} />}</>;
}

export default DashboardContent;
