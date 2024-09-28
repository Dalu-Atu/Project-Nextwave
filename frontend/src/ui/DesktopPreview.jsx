import styled from "styled-components";
import MovieStats, { MovieGenres } from "./MovieStats";

import SkeletonLoader from "./SkeletonLoader";

const DesktopMoviePreviewCard = styled.div`
  position: relative;
  width: inherit;
  height: inherit;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Black overlay with 50% opacity */
  }
`;
const StyledDesktopPreview = styled.div`
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  height: 59vh;
  width: 100%;
  background-color: var(--color-card);
  overflow: hidden;
  border: 1px solid red;
`;
const StyledDesktopViewContent = styled.div`
  position: relative;
  top: -13rem;
  height: 100%;
  width: 100%;
  color: #9b9b9b;
  padding: 1rem 1rem;
`;
const CardTitle = styled.h1``;
const CardDescription = styled.p`
  margin-top: 1rem;
`;
const StyledMovieCastContainer = styled.div`
  margin-top: 2rem;
`;
const CastContainer = styled.div`
  padding: 0 0.3rem;
  display: flex;
  justify-content: space-around;
  width: fit-content;
  max-width: 30rem;
  overflow: scroll;
  position: relative;
  right: 1rem;
`;
const CastImages = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  object-fit: cover;
  margin: 0px 0.2rem;
  margin-top: 0.5rem;
`;
const PlayBtn = styled.div`
  position: absolute;
  bottom: 45%;
  left: 45%;
  transform: translate(-50% 50%);
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  padding: 1.5rem;
  background: var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
`;

function DesktopPreviewContent({ loading, movie }) {
  return (
    <StyledDesktopViewContent>
      {loading ? (
        <SkeletonLoader width={"0px"} />
      ) : (
        <CardTitle>{movie?.title}</CardTitle>
      )}
      {loading ? (
        <SkeletonLoader width={"300px"} height={"70px"} />
      ) : (
        <>
          <MovieStats stats={movie} />
          <MovieGenres genres={movie?.genreIds} />
        </>
      )}
      {loading ? (
        <SkeletonLoader height={"100px"} />
      ) : (
        <CardDescription>{movie?.synopsis}</CardDescription>
      )}
      {loading ? <p></p> : <>{/* <MovieCast /> */}</>}
    </StyledDesktopViewContent>
  );
}
const VideoFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
`;

function DesktopPreview({ movie, loading }) {
  console.log(movie);

  return (
    <StyledDesktopPreview>
      <>
        <DesktopMoviePreviewCard>
          <VideoFrame
            src={`https://www.youtube.com/embed/${movie?.trailer?.key}?rel=0&modestbranding=1`}
            title={movie?._doc.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          ;
        </DesktopMoviePreviewCard>
        <DesktopPreviewContent movie={movie?._doc} loading={loading} />
      </>
    </StyledDesktopPreview>
  );
}

export default DesktopPreview;
//  {
//    /* {loading ? (
//           <SkeletonLoader height={"inherit"} />
//         ) : (
//           <CardImage
//             src={
//               `${import.meta.env.VITE_TMDB_POSTER}${
//                 movie._doc?.backdropPoster
//               }` || movie?.image
//             }
//             onError={(e) => {
//               e.target.onerror = null; // prevents looping
//               e.target.src = movie?.image;
//             }}
//           ></CardImage>
//         )}
//         <PlayBtn onClick={() => setPlayMovie(true)}>
//           <FaPlay size={"50px"} />
//         </PlayBtn> */
//  }
