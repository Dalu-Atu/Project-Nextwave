import styled from "styled-components";
import NavContainer from "../ui/NavContainer";
import Overview from "../ui/Overview";
import { useEffect, useState } from "react";
import DashboardContent from "../ui/DashboardContent";
import { useNewReleases } from "../../services/movies";

import "react-loading-skeleton/dist/skeleton.css";
import LoadingSpinner from "../ui/LoadingSpinner";

const HomeBg = styled.div`
  padding: 15px;
  border: 1px solid black;
  position: relative;
  height: fit-content;
  width: 100vw;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, black),
    ${({ $isportrait, $image }) =>
      $isportrait
        ? `linear-gradient(to right, black 50%, rgba(0, 0, 0, 0)), url(${$image}) no-repeat right center`
        : `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0)), url(${$image}) no-repeat right center`};
  background-size: ${({ $isportrait }) =>
    $isportrait ? "50% 100vh, contain" : "cover"};
  background-position: ${({ $isportrait }) =>
    $isportrait ? "right center" : "center center"};

  /* Media query for 710px and below */
  @media (max-width: 710px) {
    background: ${({ $poster }) => `url(${$poster}) no-repeat center center`};
    background-size: cover;

    /* Adding backdrop for better text readability */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6); /* Semi-transparent backdrop */
      z-index: 1; /* Keep it behind the content */
    }
  }
`;

function MovieDashboard() {
  const [isPortrait, setIsPortrait] = useState(false);
  const movies = useNewReleases();
  const { isLoading, mostTrendingMovie, recomendedMovies } = movies;

  const poster = mostTrendingMovie?.image;
  const trendingMovieImage =
    `${import.meta.env.VITE_TMDB_IMAGE}${mostTrendingMovie?.backdropPoster}` ||
    mostTrendingMovie?.image;

  useEffect(() => {
    const img = new Image();
    img.src = trendingMovieImage;
    img.onload = () => {
      setIsPortrait(img.naturalHeight > img.naturalWidth);
    };
  }, [trendingMovieImage]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <HomeBg
        $isportrait={isPortrait}
        $image={trendingMovieImage}
        $poster={poster}
      >
        <div className="backdrop"></div>
        <Overview
          data={{
            mostTrendingMovie,
            recomendedMovies,
          }}
        />
      </HomeBg>

      <DashboardContent data={movies} />

      <NavContainer />
    </>
  );
}

export default MovieDashboard;

// sometimes the image is not a lanscape image meaning that it get so,how streched but work well in a landscape image. how do i make a situation that if it is potraiit the image show fill ath the right hand side till it uses up it sull with and the left part which is the rest side should be coverd with that linear gradient black just as it is on google tv
