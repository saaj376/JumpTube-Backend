import React from "react";
import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link to={`/video/${video.id}`} className="video-card">
      <img src={video.thumbnail} alt={video.title} />
      <h3>{video.title}</h3>
    </Link>
  );
}

export default VideoCard;
