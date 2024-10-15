import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../../axiosConfig";
import SkeletonLoader from "./SkeletonLoader";
import { Card, CardImage, CardTitle } from "./MovieCard";

const SearchPage = () => {
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
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <SearchContainer>
      <TopBar>
        <BackButton onClick={handleBackClick}>
          <IoIosArrowBack />
        </BackButton>
        <SearchInput
          type="text"
          placeholder="Search movies or TV series..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </TopBar>

      <ResultsContainer>
        {loading && (
          <>
            {Array.from({ length: 20 }).map((_, index) => (
              <SkeletonLoader key={`search-${index}`} />
            ))}
          </>
        )}

        {results.length > 0 ? (
          results.map((movie, index) => (
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
          ))
        ) : (
          <NoResults>No results found.</NoResults>
        )}
      </ResultsContainer>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  /* Apply safe area padding only on devices with a notch */
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  box-shadow: 0 4px 2px -2px rgba(224, 224, 224, 0.2);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  @supports (padding: env(safe-area-inset-top)) {
    padding-top: calc(
      env(safe-area-inset-top) + -0.1rem
    ); /* Add safe area for iPhones */
  }
`;

const BackButton = styled.div`
  font-size: 27px;
  cursor: pointer;
  margin-right: 5px;
  position: relative;
  top: 4px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: rgba(224, 224, 224, 0.2);
  border-radius: 20px;
  color: var(--color-primary);
  padding-left: 1rem;
`;

const ResultsContainer = styled.div`
  margin-top: 60px; /* Add some space to avoid overlapping with the top bar */
  padding: 10px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* Minimum card size, max flexible */
  gap: 19px; /* Adjust space between cards */
  padding: 10px;

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

const NoResults = styled.div`
  text-align: center;
  font-size: 16px;
  /* margin: 0 auto; */
  width: 95vw;
`;

export default SearchPage;
