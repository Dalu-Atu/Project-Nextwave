import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosConfig";
import toast from "react-hot-toast";

const genreMap = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  Thriller: 53,
  War: 10752,
  Western: 37,
};
function getGenreId(genreName) {
  return genreMap[genreName];
}

const getAllNewReleases = async () => {
  try {
    const res = await axiosInstance.get("/movies/new-releases");

    if (res.data.status === "success") return res.data.movies;
  } catch (error) {
    const message = error.response.data.message || error.message;
    if (message) throw message;
  }
};
const getGenresById = async function (genreId) {
  const res = await axiosInstance.get(`movies/genre/${genreId}`);
  console.log(res);

  return res.data.movies;
};
const getMovies = async (movieTitle) => {
  if (!movieTitle) return;

  try {
    const res = await axiosInstance.get(`/movies/title/${movieTitle}`);

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
const getMoviesSeries = async (type) => {
  console.log(type);

  try {
    const res = await axiosInstance.get(`/movies/category/${type}`);
    console.log(res);
    if (res.data.status === "success") return res.data.movies;
  } catch (error) {
    const message = error.response.data.message || error.message;
    console.log(message);
  }
};

const getDownloadLink = async (movieDetails) => {
  console.log(movieDetails);
  try {
    const res = await axiosInstance.post(`/movies/download/`, movieDetails);
    if (!res.data.link) throw new Error(`Could not download`); // Handle missing link
    if (res.data.status === "success") return res.data;
  } catch (error) {
    const message = error?.response?.data?.message || error.message;
    console.log("Error in getDownloadLink:", message);
    throw new Error(message); // Rethrow the error to propagate it
  }
};

export function useNewReleases() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["all-movies"],
    queryFn: getAllNewReleases,
  });

  if (isLoading) {
    return {
      isLoading,
      newReleases: [],
      trendingSeries: [],
      trendingMovies: [],
      kidsShows: [],
      mostTrendingMovie: [],
      upComings: [],
      recomendedMovies: [],
      error,
    };
  }

  const {
    newReleases = [],
    trendingSeries = [],
    trendingMovies = [],
    kidsShows = [],
    mostTrendingMovie = [],
    upComings = [],
    recomendedMovies = [],
  } = data || {};

  return {
    upComings,
    newReleases,
    trendingSeries,
    trendingMovies,
    kidsShows,
    mostTrendingMovie,
    recomendedMovies,
    isLoading,
    error,
  };
}

export function useGetGenre(genreName) {
  const genreId = getGenreId(genreName);
  const { isLoading, data } = useQuery({
    queryKey: [genreName],
    queryFn: () => getGenresById(genreId),
  });

  return { isLoading, data };
}

export function useMovieDetails(title) {
  const { isLoading, data } = useQuery({
    queryKey: ["movieDetails", title],
    queryFn: () => getMovies(title),
  });
  return { isLoading, data };
}

export function useGetMoviesSeries(type) {
  const { isLoading, data } = useQuery({
    queryKey: ["moviesSeries", type],
    queryFn: async () => await getMoviesSeries(type),
  });

  return { isLoading, data };
}

export function useDownloadMovie() {
  const { mutateAsync: download, isPending: isDownloading } = useMutation({
    mutationFn: async (movieDetails) => await getDownloadLink(movieDetails), // Ensure this returns the direct file URL
    onSuccess: (data) => {
      // Show a success message
      toast.success("Downloading...");

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = data?.link; // Use the download link from the response
      link.setAttribute("download", "yourfile.mkv"); // Specify a filename if needed

      // Append the anchor to the body (not displayed)
      document.body.appendChild(link);
      link.click(); // Simulate a click on the link to start the download
      document.body.removeChild(link); // Remove the link from the DOM after the download
    },
    onError: (error) => {
      const errorMessage =
        error?.message || "An error occurred during the download.";
      toast.error(errorMessage); // Show the error in the toast
      console.error("Error in download:", errorMessage);
    },
  });

  return { download, isDownloading };
}
