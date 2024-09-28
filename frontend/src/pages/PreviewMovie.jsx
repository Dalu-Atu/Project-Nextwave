import { useParams } from "react-router-dom";
import styled from "styled-components";
import DesktopPreview from "../ui/DesktopPreview";
import ActionButtons from "../ui/ActionButtons";
import CommentSection from "../ui/CommentSection";
import PreveiewMovieRecomendation from "../ui/PreveiewMovieRecomendation";
import SimilarMovies from "../ui/SimilarMovies";
import NavContainer from "../ui/NavContainer";
import { useMovieDetails } from "../../services/movies";

const StyledPreview = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--color-bg);
  color: var(--primary-color);
  padding: 1rem;
  overflow: hidden;

  display: grid;
  grid-template-rows: auto 1fr; /* Two rows: nav and main + sidebar */
  grid-template-columns: 1fr 455px; /* Main takes full width, sidebar fixed width */
  grid-template-areas:
    "nav nav "
    "main sidebar";

  /* Ensure main and sidebar have correct area definitions */
  .nav {
    grid-area: nav;
  }

  .main {
    grid-area: main;
    /* border: 1px solid red; */
    overflow: hidden;
    overflow-y: auto;
  }

  .sidebar {
    grid-area: sidebar;
    overflow: hidden;
    overflow-y: auto;
    padding-left: 5px;
  }
`;

function PreviewMovie() {
  const { title } = useParams();
  const { isLoading, data } = useMovieDetails(title);
  console.log();

  return (
    <StyledPreview>
      <div className="nav">
        <NavContainer />
      </div>
      <div className="main">
        <DesktopPreview movie={data?.movie} loading={isLoading} />
        <ActionButtons data={{ isLoading, movie: data?.movie?._doc }} />
        <SimilarMovies movies={data?.similarMovies} loading={isLoading} />
      </div>
      <div className="sidebar">
        <PreveiewMovieRecomendation />
      </div>
    </StyledPreview>
  );
}

export default PreviewMovie;
