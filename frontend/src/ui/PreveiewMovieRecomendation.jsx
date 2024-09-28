// import image1 from '../assets/home.jpg';
import image2 from "../assets/Trigger.jpg";
// import image3 from '../assets/download.jfif';
import MovieStats from "./MovieStats";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import PlayButton from "./PlayButton";
import { useNewReleases } from "../../services/movies";

export const Recomendation = styled(Link)`
  text-decoration: none;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  width: 450px;
  height: 250px;
  overflow: hidden;
  color: var(--primary-color);

  .recomendation-img {
    width: 45%;
    height: 100%;
    overflow: hidden;
    position: relative;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      transition: transform 0.3s ease; /* Smooth transition */
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: background 0.3s ease; /* Smooth transition */
      z-index: 1;
    }
    &:hover:before {
      background: rgba(0, 0, 0, 0.6); /* Darker overlay on hover */
    }
  }

  .recomendation-content {
    width: 55%;
    height: 100%;
    padding: 0.5rem;
    position: relative;
    right: 0rem;
  }

  &:hover .recomendation-img img {
    transform: scale(1.1); /* Zoom effect on hover */
  }
`;
const Label = styled.p`
  position: relative;
  top: 0.5rem;
  left: 0.5rem;
  color: lightgray;
`;

function PreveiewMovieRecomendation() {
  const { trendingMovies } = useNewReleases();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <Label>Top Movies</Label>
      {trendingMovies.map((movie, i) => (
        <Recomendation
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          key={i}
          to={`/movie/${movie.title}`}
        >
          <div className="recomendation-img">
            <img
              src={
                `${import.meta.env.VITE_TMDB_POSTER}${movie?.poster}` ||
                movie?.image
              }
              onError={(e) => {
                e.target.onerror = null; // prevents looping
                e.target.src = movie?.image;
              }}
              alt={movie.id}
            />
            {hoveredIndex === i && <PlayButton />}
          </div>
          <div className="recomendation-content">
            <h3>{movie.title}</h3>
            <MovieStats />
            {/* <p>{movie.synopsis}</p> */}
          </div>
        </Recomendation>
      ))}
    </>
  );
}
export default PreveiewMovieRecomendation;
