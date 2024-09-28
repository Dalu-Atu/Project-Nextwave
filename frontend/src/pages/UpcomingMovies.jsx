import styled from "styled-components";
import NavContainer from "../ui/NavContainer";
import SkeletonLoader from "../ui/SkeletonLoader";
import { useState } from "react";
import { useNewReleases } from "../../services/movies";
import React from "react";
import { FaStar } from "react-icons/fa";

// Container for each video card
const VideoCardContainer = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 2.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// Video thumbnail
const ThumbnailContainer = styled.div`
  position: relative;
  min-width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
  border-radius: 10px; /* Border radius for rounded corners */
`;

const VideoThumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the container without stretching */
  border-radius: 10px; /* Ensure the image follows the container's border radius */
`;
// Container for video details (title, channel info)
const VideoDetails = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  top: 0.8rem;
  left: 1rem;
`;

// Channel Avatar (on the left)
const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
  background: linear-gradient(90deg, #28d5a7, #00aa6c);
`;

// Video Title and Channel Info
const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

// Video Title
const VideoTitle = styled.h3`
  font-size: 16px;
  margin: 0;
  color: #fff;
`;

// Channel Name and Views
const ChannelInfo = styled.p`
  font-size: 14px;
  color: #aaa;
  margin: 0rem 0 0;
`;

const IframeContainer = styled.div`
  position: relative;
  min-width: 100%; // Full width of the parent container
  padding-top: 56.25%; // 16:9 Aspect Ratio (height = width * 9 / 16)
  overflow: hidden;
  border-radius: 8px; // Optional: for rounded corners
  background: linear-gradient(90deg, #28d5a7, #00aa6c);
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 100%;
  border: none;
`;
export const StyledUpcomings = styled.div`
  margin: 1rem 0rem;
  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const ResponsiveIframe = ({ src, title, handleVideoLoad }) => {
  return (
    <IframeContainer>
      <StyledIframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleVideoLoad} // Here you should reference the `handleVideoLoad` function directly
      />
    </IframeContainer>
  );
};

export const UpcomingMovieCard = ({ movie }) => {
  const [showVideo, setShowVideo] = useState(false);
  const key = movie?.trailers[0]?.key;

  return (
    <VideoCardContainer>
      {!showVideo ? (
        <>
          <ThumbnailContainer>
            <VideoThumbnail
              onClick={() => {
                setShowVideo(true);
              }}
              src={`https://img.youtube.com/vi/${key}/hqdefault.jpg`}
              alt={movie.title}
            />
          </ThumbnailContainer>

          <VideoDetails>
            <Avatar />
            <VideoInfo>
              <VideoTitle>{movie.title}</VideoTitle>
              <ChannelInfo>
                {"Rating"} • {movie.vote_average.toFixed(2)}{" "}
                <FaStar style={{ position: "relative", top: "0.1rem" }} />
              </ChannelInfo>
            </VideoInfo>
          </VideoDetails>
        </>
      ) : (
        <>
          <ResponsiveIframe
            src={`https://www.youtube.com/embed/${key}?rel=0&modestbranding=1`}
            title={movie.title}
          />
          <VideoDetails>
            <Avatar src={""} alt={"img"} />
            <VideoInfo>
              <VideoTitle>{movie.title}</VideoTitle>
              <ChannelInfo>
                {"Rating"} • {"Good"}
              </ChannelInfo>
            </VideoInfo>
          </VideoDetails>
        </>
      )}
    </VideoCardContainer>
  );
};

function UpcomingMovies() {
  const { isLoading, upComings } = useNewReleases();

  return (
    <>
      <NavContainer />
      <h4>Upcoming Movies</h4>
      <StyledUpcomings>
        {isLoading
          ? Array(20)
              .fill()
              .map((_, index) => (
                <SkeletonLoader key={index} width="375px" height="250px" />
              ))
          : upComings.map((movie, i) => (
              <UpcomingMovieCard key={i} movie={movie} />
            ))}
      </StyledUpcomings>
    </>
  );
}

export default UpcomingMovies;
