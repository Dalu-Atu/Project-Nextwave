import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import PremiumTag from "./PremiumTag";

const StyledMovieStats = styled.div`
  margin-top: 0.3rem;
  display: flex;
  padding: 0.5rem;
  justify-content: space-around;
  width: fit-content;
  color: lightgray;
  font-weight: bold;
  position: relative;
  right: 1rem;
  font-size: small;
  margin-left: 10px;
`;
const StyledMovieGenres = styled.div`
  display: flex;
  color: lightgray;
  font-size: small;
  font-style: italic;
  /* margin-top: 0.3rem;
  display: flex;
  padding: 0.5rem;
  justify-content: space-around;
  width: fit-content;
  font-weight: bold;
  position: relative;
  right: 1rem;
  font-size: small;
  margin-left: 10px; */
`;
const StarIcon = styled(FaStar)`
  color: gold;
  padding-right: 0.3rem;
  margin-right: 0rem;
`;
const Label = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;
const Rating = styled.div`
  display: flex;
  align-items: center;
`;

function MovieStats({ stats }) {
  return (
    <StyledMovieStats>
      <Rating>
        <StarIcon />
        <span>{stats?.ratings}</span>
      </Rating>
      <Label>
        <span>123</span>m
      </Label>
      <Label>{stats?.releaseDate}</Label>

      <PremiumTag />
    </StyledMovieStats>
  );
}

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export function MovieGenres({ genres }) {
  return (
    <StyledMovieGenres>
      {genres?.map((genreId) => (
        <Label key={genreId}>{`${genreMap[genreId]}`}</Label>
      ))}
    </StyledMovieGenres>
  );
}
export default MovieStats;
