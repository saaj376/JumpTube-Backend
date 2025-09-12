import HomePage from "./pages/HomePage.jsx";
import VideoPage from "./pages/VideoPage.jsx";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/video/:id",
    element: <VideoPage />,
  },
];

export default routes;
