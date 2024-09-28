import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";
import i from "../assets/duneposter.webp";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import SkeletonLoader from "./SkeletonLoader";

const SearchResults = styled.div`
  position: absolute;
  top: 70px;
  right: -2rem;
  max-height: 350px;
  overflow-y: auto;
  min-width: max-content;

  border-radius: 10px;
  background-color: rgba(209, 209, 209, 0.4);
  backdrop-filter: blur(100px);
  padding: 15px;
  z-index: 10;
  @media (max-width: 768px) {
    position: absolute;
    top: 70px;
    right: -3rem;
    min-width: 98vw;
  }
`;
const StyledSearchItem = styled(Link)`
  color: #e0e0e0;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin: 10px 0;
  cursor: pointer;
  background-color: var(--color-card);
  border-radius: var(--border-radius-sm);

  .item-image {
    height: 5rem;
    min-width: 6rem;
    max-width: 6rem;
    border-radius: 5px;
    overflow: hidden; /* Ensure image doesn't overflow container */

    img {
      transform: scale();
      height: 100%;
      width: 100%;
      object-fit: cover; /* Ensures the image covers the container while maintaining aspect ratio */
    }
  }

  .search-item-content {
    margin-left: 0.7rem;
    line-height: 1px;
  }
`;

function SearchItem({ movie }) {
  return (
    <StyledSearchItem to={`/movie/${movie.title}`}>
      <div className="item-image">
        <img
          src={`${import.meta.env.VITE_TMDB_POSTER}${movie.backdropPoster}`}
          alt={movie.title}
        />
      </div>
      <div className="search-item-content">
        <p>{movie.title}</p>
        <p style={{ color: "var(--secondary-color-light)", fontSize: "small" }}>
          {movie.category === "International" ? "Movie" : "TV Series"}
        </p>
      </div>
    </StyledSearchItem>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 0) {
        setLoading(true);
        try {
          const res = await axiosInstance.get(`movies/search?q=${query}`);
          setResults(res.data);
        } catch (error) {
          console.error("Search error:", error);
          setResults([]);
        }
        setLoading(false);
      } else {
        setResults([]);
        setLoading(false);
      }
    }, 500); // Added a 500ms delay to simulate debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="search-container">
      <IoIosSearch className="operations-icon" size={"29px"} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies or TV series..."
      />
      {loading && (
        <SearchResults>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonLoader key={index} width="100%" height="50px" />
          ))}
        </SearchResults>
      )}
      {!loading && results.length > 0 && (
        <SearchResults
          onMouseLeave={() => {
            setResults([]);
            setQuery("");
          }}
        >
          {results.map((result, index) => (
            <SearchItem key={index} movie={result} />
          ))}
        </SearchResults>
      )}
      {!loading && query.length > 0 && results.length === 0 && (
        <div className="no-results">No results found</div>
      )}
    </div>
  );
}

export default Search;
