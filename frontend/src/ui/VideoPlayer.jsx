import { useEffect } from "react";
import { useStream } from "../../services/movies";
import LoadingSpinner from "./LoadingSpinner";
import { useState, useRef } from "react";
import styled from "styled-components";

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const VideoFrame = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
`;

const SkipButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;
  font-size: 14px;
  display: ${({ $show }) => ($show === "true" ? "block" : "none")};

  &:before {
    border-radius: var(--border-radius-sm);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1); /* Black overlay with 50% opacity */
  }
  @media (max-width: 768px) {
    position: absolute;
    bottom: 20px;
    right: 10px;
  }
`;
const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); // Optional: Dark background for better readability
  color: white; // White text for visibility
`;

const DownloadLink = styled.a`
  background: var(--secondary-color);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bolder;
  text-decoration: none;
  margin-top: 10px;
`;

const StreamPlayer = ({ movie }) => {
  const { stream, isStreaming } = useStream();
  const [streamUrl, setStreamUrl] = useState(null);
  const [playbackError, setPlaybackError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const movieCategory = movie?.category;

  const handleStreamMovie = async () => {
    if (!streamUrl && movieCategory !== "TV Series") {
      const movieUrl = await stream({
        category: movie?.category,
        link: movie?.link,
      });
      setStreamUrl(movieUrl.link);
    }
  };

  useEffect(() => {
    if (!streamUrl) {
      handleStreamMovie();
    }
  }, [movie]);

  const handleLoadedMetadata = (event) => {
    const videoElement = event.target;
    if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
      setVideoLoaded(true);
    }
  };

  const handlePlaybackError = () => {
    setPlaybackError(true);
  };

  const handleTimeUpdate = (event) => {
    const videoElement = event.target;
    if (!videoLoaded && videoElement.currentTime > 0) {
      setPlaybackError(true);
    }
  };

  if (!streamUrl || isStreaming) return <LoadingSpinner msg={"Loading..."} />;

  return (
    <VideoContainer>
      {!playbackError ? (
        <video
          width="100%"
          height="100%"
          controls
          autoPlay
          onLoadedMetadata={handleLoadedMetadata}
          onError={handlePlaybackError}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={streamUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <CenteredContainer>
          <p>
            It seems your browser cannot play this video correctly. You can
            download the movie and watch it offline.
          </p>
          <DownloadLink href={streamUrl} download>
            Download Movie
          </DownloadLink>
        </CenteredContainer>
      )}
    </VideoContainer>
  );
};

const VideoPlayer = ({ movie }) => {
  const [showVideo, setShowVideo] = useState(false); // State to control which video to show
  const videoRef = useRef(null); // Reference for local video player
  const trailerKey = movie?.trailer?.key;
  const category = movie?._doc.category;

  const handleSkipTrailer = () => {
    setShowVideo(true);
    videoRef.current.play();
  };

  return (
    <VideoContainer>
      {!showVideo ? (
        <>
          {/* YouTube embedded trailer */}
          <VideoFrame
            src={`https://www.youtube.com/embed/${trailerKey}?&modestbranding=1`}
            title="Trailer"
          />
          {category !== "TV Series" && (
            <SkipButton $show={`${!showVideo}`} onClick={handleSkipTrailer}>
              Skip Trailer
            </SkipButton>
          )}
        </>
      ) : (
        <StreamPlayer ref={videoRef} movie={movie?._doc} />
      )}
    </VideoContainer>
  );
};
export default VideoPlayer;
