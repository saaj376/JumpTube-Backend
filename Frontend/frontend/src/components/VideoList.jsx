import React from "react";
import VideoCard from "./VideoCard.jsx";

function VideoList() {
  // Placeholder video list
  const videos = [
    { id: "1", title: "React Tutorial", thumbnail: "https://via.placeholder.com/150" },
    { id: "2", title: "Learn JavaScript", thumbnail: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="video-list">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoList;
