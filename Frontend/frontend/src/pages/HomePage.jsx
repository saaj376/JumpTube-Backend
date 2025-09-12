import React from "react";
import SearchBar from "../components/SearchBar.jsx";
import VideoList from "../components/VideoList.jsx";

function HomePage() {
  return (
    <div className="home-page">
      <h1>🎬 JumpTube</h1>
      <SearchBar />
      <VideoList />
    </div>
  );
}

export default HomePage;
