import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MovieDashboard from "./pages/MovieDashboard";
import GlobalStyles from "./styles/GlobalStyles";
import PreviewMovie from "./pages/PreviewMovie";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Stream from "./ui/Stream";
import MediaDisplay from "./pages/MediaDisplay";
import WatchList from "./pages/WatchList";
import UpcomingMovies from "./pages/UpcomingMovies";
import Subscription from "./pages/Subscription";
import PaymentPage from "./pages/PaymentPage";
import Homepage from "./pages/HomePage";
import Signup from "./ui/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AllSet from "./ui/AllSet";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ui/ProtectedRoute";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import WatchPage from "./pages/WatchPage";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 20,
      startTime: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter stripe={stripePromise}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="welcome" element={<Signup />} />
            <Route path="signup/:page" element={<Subscription />} />

            {/* Protected routes */}
            <Route
              path="dashboard"
              element={<ProtectedRoute element={<MovieDashboard />} />}
            />
            <Route
              path="movies"
              element={
                <ProtectedRoute element={<MediaDisplay type="movies" />} />
              }
            />
            <Route
              path="series"
              element={
                <ProtectedRoute element={<MediaDisplay type="series" />} />
              }
            />
            <Route
              path="movies/:genre"
              element={<ProtectedRoute element={<MediaDisplay />} />}
            />

            <Route
              path="movie/:title"
              // element={<PreviewMovie />}
              element={<ProtectedRoute element={<WatchPage />} />}
            />
            <Route
              path="upcoming-movie/:id"
              element={<ProtectedRoute element={<PreviewMovie />} />}
            />
            <Route
              path="settings"
              element={<ProtectedRoute element={<Settings />} />}
            />
            <Route
              path="profile"
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route path="stream/:movie" element={<Stream />} />
            <Route
              path="watchlist"
              element={<ProtectedRoute element={<WatchList />} />}
            />
            <Route
              path="subscription"
              element={
                <ProtectedRoute
                  element={
                    <Elements stripe={stripePromise}>
                      <Subscription />
                    </Elements>
                  }
                />
              }
            />
            <Route
              path="payment/:plan"
              element={<ProtectedRoute element={<PaymentPage />} />}
            />
            <Route
              path="upcomings"
              element={<ProtectedRoute element={<UpcomingMovies />} />}
            />
            <Route
              path="watch-now"
              element={<ProtectedRoute element={<AllSet />} />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px", zIndex: "99999999999999999999999" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            background: "#28d5a7",
            color: "#fff",
            zIndex: "99999999999999999999999",
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
