// import { useEffect, useState } from "react";
// import { BiBell } from "react-icons/bi";
// import { CgShare } from "react-icons/cg";
// import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
// import { RiDownload2Line, RiPlayListAddLine } from "react-icons/ri";
// import axiosInstance from "../../axiosConfig";
// import styled from "styled-components";
// import { useAuth } from "../../context/AuthContext";
// import CommentSection from "./CommentSection";
// import toast from "react-hot-toast";
// import { useDownloadMovie } from "../../services/movies";
// import SpinnerMini from "./SpinnerMini";

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   background-color: var(--color-card);
//   border-radius: 10px;
//   padding: 0.5rem;
//   padding-left: 0.7rem;
//   padding-right: 0.7rem;
//   white-space: nowrap;
//   margin: 0 0.9rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// `;

// const Button = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   background: none;
//   border: none;
//   cursor: pointer;
//   font-size: 1rem;
//   color: ${(props) => (props.active ? "#28d5a7" : "#919191")};

//   &:hover {
//     color: var(--prinary-color);
//   }

//   svg {
//     font-size: 1.5rem;
//   }
// `;

// const LikeDislike = ({ data }) => {
//   const movie = data;
//   const { user } = useAuth();

//   const [likes, setLikes] = useState(0);
//   const [dislikes, setDislikes] = useState(0);
//   const [liked, setLiked] = useState(false);
//   const [disliked, setDisliked] = useState(false);

//   useEffect(() => {
//     setLikes(movie?.likes);
//     setDislikes(movie?.dislikes);
//     setLiked(movie?.userLikes?.includes(user._id) || "");
//     setDisliked(movie?.userDislikes?.includes(user._id) || "");
//   }, [movie, user._id]);

//   const handleLike = async () => {
//     try {
//       const response = await axiosInstance.post(
//         `/movies/like?id=${movie._id}&user=${user._id}`
//       );
//       setLikes(response.data.movie.likes);
//       setDislikes(response.data.movie.dislikes);
//       setLiked(!liked);
//       if (disliked) {
//         setDisliked(false);
//       }
//     } catch (error) {
//       console.error("Error liking the movie:", error);
//     }
//   };

//   const handleDislike = async () => {
//     try {
//       const response = await axiosInstance.post(
//         `/movies/dislike?id=${movie._id}`
//       );
//       setLikes(response.data.movie.likes);
//       setDislikes(response.data.movie.dislikes);
//       setDisliked(!disliked);
//       if (liked) {
//         setLiked(false);
//       }
//     } catch (error) {
//       console.error("Error disliking the movie:", error);
//     }
//   };

//   return (
//     <Container>
//       <Button onClick={handleLike} active={liked}>
//         <FaThumbsUp />
//         <span>{likes}</span>
//       </Button>
//       <Button onClick={handleDislike} active={disliked}>
//         <FaThumbsDown />
//         <span>{dislikes}</span>
//       </Button>
//     </Container>
//   );
// };
// // --secondary-color-light:#28d5a7;
// // --secondary-color-dark: #00aa6c;
// const StyledActionButton = styled.div`
//   margin-top: 1rem;
//   margin-left: -0.3rem;
//   height: 2rem;
//   width: 70%;
//   color: var(--primary-color);
//   /* background-color: var(--color-card); */
//   display: flex;
//   align-items: center;
// `;
// const ToggleContainer = styled.div`
//   background-color: ${({ isInWatchlist }) =>
//     isInWatchlist
//       ? "var(--secondary-color-dark)"
//       : "var(--color-card)"}; // Slightly darker on hover

//   display: flex;
//   align-items: center;
//   gap: 10px;
//   border-radius: 10px;
//   padding: 0.5rem;
//   padding-left: 0.7rem;
//   padding-right: 0.7rem;
//   margin: 0 0.9rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// `;
// const ShareButton = () => {
//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: "Check this out!",
//           text: "Here is something interesting I found.",
//           url: window.location.href, // Share the current page URL
//         });
//         console.log("Content shared successfully!");
//       } catch (error) {
//         console.error("Error sharing content:", error);
//       }
//     } else {
//       alert("Sharing is not supported on this device.");
//     }
//   };

//   return (
//     <Container onClick={handleShare}>
//       <CgShare size={"20px"} />
//       <span style={{ fontSize: "large" }}>share</span>
//     </Container>
//   );
// };
// const WatchlistToggle = ({ data }) => {
//   const { movieId, isWatchListed } = data;
//   const [isInWatchlist, setIsInWatchlist] = useState(isWatchListed);

//   useEffect(() => {
//     setIsInWatchlist(isWatchListed);
//   }, [isWatchListed]);

//   const handleToggleWatchlist = async () => {
//     try {
//       if (isInWatchlist) {
//         const res = await axiosInstance.post(
//           `movies/remove-from-watchlist?id=${movieId}`
//         );
//         if (res.data.status === "success")
//           toast.success("Removed from watchlist");
//         const user = res.data.user;
//         localStorage.setItem("user", JSON.stringify(user));
//         //sends a custom event to be recieved by any auth context to update the user state
//         window.dispatchEvent(new Event("userUpdated"));
//       } else {
//         // Call API to add to watchlist
//         const res = await axiosInstance.post(
//           `movies/add-to-watchlist?id=${movieId}`
//         );
//         if (res.data.status === "success") toast.success("Added to watchlist");
//         const user = res.data.user;
//         localStorage.setItem("user", JSON.stringify(user));
//         //sends a custom event to be recieved by any auth context to update the user state
//         window.dispatchEvent(new Event("userUpdated"));
//       }
//       // Toggle the state
//       setIsInWatchlist(!isInWatchlist);
//     } catch (error) {
//       console.error("Error updating watchlist:", error);
//     }
//   };

//   return (
//     <ToggleContainer
//       isInWatchlist={isInWatchlist}
//       onClick={handleToggleWatchlist}
//     >
//       <RiPlayListAddLine size={"20px"} />
//       <span style={{ fontSize: "large" }}>
//         {isInWatchlist ? "Watchlisted" : "Watchlist"}
//       </span>
//     </ToggleContainer>
//   );
// };

// function ActionButtons({ data }) {
//   const { isLoading, movie } = data;
//   const { user } = useAuth();
//   const { download, isDownloading } = useDownloadMovie(movie);

//   const isMovieInWatchlist = () => {
//     return user?.watchlist?.some(
//       (watchlistMovie) => watchlistMovie._id === movie?._id
//     );
//   };

//   console.log(isMovieInWatchlist());
//   return (
//     <>
//       <StyledActionButton>
//         {isLoading ? (
//           ""
//         ) : (
//           <>
//             <LikeDislike data={movie} />
//             <ShareButton />
//             <WatchlistToggle
//               data={{
//                 movieId: movie?._id,
//                 isWatchListed: isMovieInWatchlist(),
//               }}
//             />

//             <Container>
//               <BiBell size={"20px"} />

//               <span style={{ fontSize: "large" }}>Notify</span>
//             </Container>
//             <Container
//               onClick={() => {
//                 download();
//               }}
//             >
//               {isDownloading ? (
//                 <SpinnerMini />
//               ) : (
//                 <>
//                   <RiDownload2Line size={"20px"} />
//                   <span style={{ fontSize: "large" }}>Download Movie</span>
//                 </>
//               )}
//             </Container>
//           </>
//         )}
//       </StyledActionButton>
//       {/* <CommentSection /> */}
//     </>
//   );
// }

// export default ActionButtons;
//setup tmdb to get the series video,
//set to alway try the download ur until link is found,

import { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import { CgShare } from "react-icons/cg";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { RiDownload2Line, RiPlayListAddLine } from "react-icons/ri";
import axiosInstance from "../../axiosConfig";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import CommentSection from "./CommentSection";
import toast from "react-hot-toast";
import { useDownloadMovie } from "../../services/movies";
import SpinnerMini from "./SpinnerMini";

const StyledActionButton = styled.div`
  width: fit-content;
  margin-top: 1rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  position: relative;
  right: 1rem;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: var(--color-card);
  border-radius: var(--border-radius-sm);
  padding: 0.5rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 0.9rem;
  @media (max-width: 502px) {
    padding: 0.4rem 0.4rem;
    font-size: 12px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.active ? "#28d5a7" : "#919191")};

  &:hover {
    color: var(--primary-color);
  }

  svg {
    font-size: 1.5rem;
    @media (max-width: 502px) {
      font-size: 14px;
    }
  }
  @media (max-width: 502px) {
    padding: 0.2rem 0.2rem;
    font-size: 12px;
  }
`;
const ToggleContainer = styled.div`
  background-color: ${({ isInWatchlist }) =>
    isInWatchlist
      ? "var(--secondary-color-dark)"
      : "var(--color-card)"}; // Slightly darker on hover

  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: var(--border-radius-sm);
  padding: 0.5rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  margin-left: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 502px) {
    padding: 0.4rem 0.4rem;
    font-size: 12px;
  }
`;

const LikeDislike = ({ data }) => {
  const movie = data?._doc;
  console.log(movie);

  const { user } = useAuth();

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    setLikes(movie?.likes);
    setDislikes(movie?.dislikes);
    setLiked(movie?.userLikes?.includes(user._id) || "");
    setDisliked(movie?.userDislikes?.includes(user._id) || "");
  }, [movie, user?._id]);

  const handleLike = async () => {
    try {
      const response = await axiosInstance.post(
        `/movies/like?id=${movie._id}&user=${user._id}`
      );
      setLikes(response.data.movie.likes);
      setDislikes(response.data.movie.dislikes);
      setLiked(!liked);
      if (disliked) {
        setDisliked(false);
      }
    } catch (error) {
      console.error("Error liking the movie:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axiosInstance.post(
        `/movies/dislike?id=${movie._id}`
      );
      setLikes(response.data.movie.likes);
      setDislikes(response.data.movie.dislikes);
      setDisliked(!disliked);
      if (liked) {
        setLiked(false);
      }
    } catch (error) {
      console.error("Error disliking the movie:", error);
    }
  };

  return (
    <Container>
      <Button onClick={handleLike} active={liked}>
        <FaThumbsUp />
        <span>{likes}</span>
      </Button>
      <Button onClick={handleDislike} active={disliked}>
        <FaThumbsDown />
        <span>{dislikes}</span>
      </Button>
    </Container>
  );
};

const ShareButton = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "Here is something interesting I found.",
          url: window.location.href, // Share the current page URL
        });
        console.log("Content shared successfully!");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  return (
    <Container onClick={handleShare}>
      <CgShare size={"20px"} />
      <span>share</span>
    </Container>
  );
};
const WatchlistToggle = ({ data }) => {
  console.log(data);

  const { movieId, isWatchListed } = data;
  const [isInWatchlist, setIsInWatchlist] = useState(isWatchListed);

  useEffect(() => {
    setIsInWatchlist(isWatchListed);
  }, [isWatchListed]);

  const handleToggleWatchlist = async () => {
    try {
      if (isInWatchlist) {
        const res = await axiosInstance.post(
          `movies/remove-from-watchlist?id=${movieId}`
        );
        if (res.data.status === "success")
          toast.success("Removed from watchlist");
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        //sends a custom event to be recieved by any auth context to update the user state
        window.dispatchEvent(new Event("userUpdated"));
      } else {
        // Call API to add to watchlist
        const res = await axiosInstance.post(
          `movies/add-to-watchlist?id=${movieId}`
        );
        if (res.data.status === "success") toast.success("Added to watchlist");
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        //sends a custom event to be recieved by any auth context to update the user state
        window.dispatchEvent(new Event("userUpdated"));
      }
      // Toggle the state
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  };

  return (
    <ToggleContainer
      isInWatchlist={isInWatchlist}
      onClick={handleToggleWatchlist}
    >
      <RiPlayListAddLine size={"20px"} />
      <span>{isInWatchlist ? "Watchlisted" : "Watchlist"}</span>
    </ToggleContainer>
  );
};

function ActionButtons({ data }) {
  const { isLoading, movie } = data;
  const { user } = useAuth();
  const { download, isDownloading } = useDownloadMovie(movie);

  console.log(movie);

  const isMovieInWatchlist = () => {
    return user?.watchlist?.some(
      (watchlistMovie) => watchlistMovie._id === movie?._id
    );
  };

  console.log(isMovieInWatchlist());
  return (
    <StyledActionButton>
      <LikeDislike data={movie} />
      <ShareButton />
      <WatchlistToggle
        data={{
          movieId: movie?._doc?._id,
          isWatchListed: isMovieInWatchlist(),
        }}
      />

      <Container>
        <BiBell size={"20px"} />

        <span>Notify</span>
      </Container>
    </StyledActionButton>
  );
}

export default ActionButtons;
//setup tmdb to get the series video,
//set to alway try the download ur until link is found,
