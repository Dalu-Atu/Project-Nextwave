import React, { useRef, useState } from "react";
import styled from "styled-components";
import ActionButtons from "../ui/ActionButtons";
import { useParams } from "react-router-dom";
import { useDownloadMovie, useMovieDetails } from "../../services/movies";
import { RiDownload2Line } from "react-icons/ri";
import SimilarMovies from "../ui/SimilarMovies";
import { MovieGenres } from "../ui/MovieStats";
import SpinnerMini from "../ui/SpinnerMini";
import NavContainer from "../ui/NavContainer";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import VideoPlayer from "../ui/VideoPlayer";

// Content Container for Movie Details
const ContentContainer = styled.div`
  padding: 16px;
  background-color: black;
  margin-top: -1rem;
  z-index: 9999999;
`;

const MovieInfo = styled.div``;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

const Subtitle = styled.p`
  color: #bbb;
  margin: 8px 0;
  position: relative;
  right: 0.5rem;
`;

const DownloaButton = styled.button`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  background: var(--secondary-color-dark);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  margin-top: 16px;
`;

const MovieDescription = styled.p`
  margin-top: 16px;
  color: #ddd;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  color: white;

  button {
    background: none;
    border: none;
    color: white;
    padding: 8px 0;
    font-size: 16px;
    cursor: pointer;

    &.active {
      font-weight: bold;
      border-bottom: 2px solid white;
    }
  }
`;

const EpisodeCard = styled.div`
  display: flex;
  margin-top: 16px;
  border-radius: 4px;
`;

const EpisodeThumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const EpisodeInfo = styled.div`
  padding: 8px;
  display: flex;
  border: 1px solid var(--color-card);
  width: 80%;
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  }

  p {
    color: #bbb;
    font-size: 14px;
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
  button {
    padding: 7px;
    border-style: none;
    border-radius: var(--border-radius-sm);
    margin-left: 1rem;
    font-size: small;
    background: var(--secondary-color);
    color: white;
    @media (max-width: 768px) {
      margin-left: 0;
      margin-right: 0.3rem;
    }
  }
`;

// Page Wrapper for both Mobile and Desktop
const PageWrapper = styled.div`
  position: relative;
  background-color: black;
  min-height: 100vh;

  overflow: scroll;
  @media (min-width: 1342px) {
    display: flex;
    flex-direction: row;
    padding: 16px;
  }
`;

const VideoSection = styled.div`
  height: 100vh;
  overflow-y: scroll;
  flex: 2;
  /* padding: 16px; */

  @media (max-width: 1342px) {
    height: fit-content;
  }
`;

const RelatedSection = styled.div`
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  @media (min-width: 768px) {
    flex: 1;
    display: block;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 1)
    );
    z-index: 2; /* Ensure the gradient overlay is above the iframe */
    pointer-events: none; /* Allows clicks to pass through to the iframe */
  }

  @media (max-width: 600px) {
    height: 350px;
  }
`;

// const VideoFrame = styled.iframe`
//   border: none;
//   width: 100%;
//   height: 100%;
//   position: relative;
//   z-index: 1;
// `;

const Quality = styled.span`
  border: ${({ $type }) => ($type ? "none" : "1px solid #ff6347")};
  padding: 0.2rem 0.3rem;
  border-radius: var(--border-radius-sm);
  width: fit-content;
  font-size: small;
  background: ${({ $type }) =>
    $type ? "var(--secondary-color-reverse)" : "none"};

  margin-left: 0.6rem;
  position: relative;
  top: -0.1rem;
  color: ${({ $type }) => ($type ? "black" : "white")};
  font-weight: 7000;

  &:before {
    border-radius: var(--border-radius-sm);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.18); /* Black overlay with 50% opacity */
  }
`;

const SeriesContent = ({ series }) => {
  const { download } = useDownloadMovie();
  const [downloadingEpisode, setDownloadingEpisode] = useState(null); // Track the currently downloading episode

  const episodes = Object.values(series.details); // Convert the object of episodes into an array

  const handleDownload = (episode) => {
    setDownloadingEpisode(episode.key); // Set the episode that's being downloaded

    download({
      category: series?.category,
      link: episode.dest,
    }).finally(() => {
      setDownloadingEpisode(null); // Reset the downloading state after the download completes
    });
  };
  if (downloadingEpisode) return <LoadingSpinner msg="Downloading movie..." />;

  return (
    <>
      <Tabs>
        <h3>Episodes</h3>
      </Tabs>

      {/* Render each episode dynamically */}
      {episodes.map((episode) => (
        <EpisodeCard key={episode.key}>
          <EpisodeThumbnail
            src={series.image} // Use series.image for the thumbnail
            alt={`${episode.key} Thumbnail`} // Add an appropriate alt text
          />
          <EpisodeInfo>
            <div>
              <h3>{`Season: ${series.title.split("S")[1]}`}</h3>
              <p>{episode.key.replace(/episode/i, "Episode ")}</p>
            </div>

            <div>
              <button
                onClick={() => handleDownload(episode)} // Call handleDownload with the current episode
                disabled={downloadingEpisode === episode.key} // Disable button if this episode is downloading
              >
                Download
              </button>
            </div>
          </EpisodeInfo>
        </EpisodeCard>
      ))}
    </>
  );
};

const WatchPage = () => {
  const { title } = useParams();
  const { isLoading, data } = useMovieDetails(title);
  const movie = data?.movie;
  const { download, isDownloading } = useDownloadMovie();
  const movieCategory = movie?._doc?.category;
  const { user } = useAuth();
  const isPremium = movie?._doc?.premium;
  const selectedPlanByUser = user?.subscriptionDetails?.plan;
  const subscriptionStatus = user?.subscriptionDetails?.status;

  const handleDownloadMovie = () => {
    // console.log(selectedPlanByUser, subscriptionStatus);
    if (isPremium) {
      if (selectedPlanByUser !== "premium" || subscriptionStatus !== "active")
        return toast.error("Available for premium users only ");
      if (movieCategory !== "TV Series") {
        download({
          category: movie?._doc.category,
          link: movie?._doc.link,
        });
      }
    }

    if (movieCategory !== "TV Series") {
      download({
        category: movie?._doc.category,
        link: movie?._doc.link,
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <PageWrapper>
      <VideoSection>
        <VideoWrapper>
          <VideoPlayer movie={movie} />
        </VideoWrapper>
        <ContentContainer>
          <MovieInfo>
            <Title>
              {movie?._doc?.title}
              <Quality>HD</Quality>
              <Quality>4K</Quality>
              <Quality>MKV</Quality>
              {isPremium ? <Quality $type="premium">PREMIUM</Quality> : ""}
            </Title>
            <Subtitle>
              {/* {movie?.releaseDate} • */}
              <MovieGenres genres={movie?._doc?.genreIds} />
            </Subtitle>
          </MovieInfo>
          <DownloaButton onClick={handleDownloadMovie}>
            {isDownloading ? (
              <>
                <SpinnerMini /> <span>pleasw wait..</span>
              </>
            ) : (
              <>
                <RiDownload2Line size={"25px"} />
                <span style={{ fontSize: "large" }}>
                  {movieCategory === "TV Series"
                    ? "Download Series Below"
                    : "Download Movie"}
                </span>
              </>
            )}
          </DownloaButton>
          <ActionButtons data={{ isLoading, movie }} />
          <MovieDescription>
            {movie?._doc?.synopsis}
            {/* <span> Read more</span> */}
          </MovieDescription>
          {movieCategory === "TV Series" && (
            <SeriesContent series={movie._doc} />
          )}
        </ContentContainer>
      </VideoSection>

      <RelatedSection>
        <h3
          style={{ color: "white", marginBottom: "16px", marginLeft: "16px" }}
        >
          Similar Movies
        </h3>
        <SimilarMovies movies={data?.similarMovies} loading={isLoading} />
      </RelatedSection>
      <NavContainer />
    </PageWrapper>
  );
};

export default WatchPage;
