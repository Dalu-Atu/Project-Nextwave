import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  .player {
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .skip {
    position: absolute;
    bottom: 5rem;
    right: 1.5rem;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius-sm);
    background: var(--primary-color);
    cursor: pointer;
    z-index: 2;
  }
  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

function Stream({ trailer, backBtn }) {
  const navigate = useNavigate();
  const [skipTrailer, setSkipTrailer] = useState(true);
  const [transcodedUrl, setTranscodedUrl] = useState("");

  useEffect(() => {
    const videoUrl =
      "https://dweds11.downloadwella.com/d/uawsam3dbwatc4c5etyuicxzt4maaasig7nfacswvglixz47ppwnwjpkzdsityo3gm7eezqu/The.Union.(NKIRI.COM).2024.NF.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv";

    const transcodeUrl = `http://localhost:5000/transcode?url=${encodeURIComponent(
      videoUrl
    )}`;

    setTranscodedUrl(transcodeUrl);
  }, []);

  return (
    <Container>
      <div className="player">
        {backBtn && (
          <div className="back">
            <BsArrowLeft onClick={() => navigate(-1)} />
          </div>
        )}
        {skipTrailer && (
          <div onClick={() => setSkipTrailer(false)} className="skip">
            Skip Trailer
          </div>
        )}
        {transcodedUrl && (
          <video
            src={
              "https://dweds9.downloadwella.com/d/tywrym3dbwatc4c5etyukuhwszsq3ckrhrt7g3yyajlxu4qblz2y7xocskdrj3n2n7auwrdh/Jackpot.(NKIRI.COM).2024.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv"
            }
            controls
            autoPlay
            loop
          />
        )}
      </div>
    </Container>
  );
}

export default Stream;
