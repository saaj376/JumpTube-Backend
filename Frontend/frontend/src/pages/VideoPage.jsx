import React from "react";
import { useParams } from "react-router-dom";
import InVideoSearch from "../components/InVideoSearch.jsx";
import TimeStampList from "../components/TimeStampList.jsx";

function VideoPage() {
  const { id } = useParams();

  return (
    <div className="video-page">
      <h2>Video ID: {id}</h2>
      <InVideoSearch videoId={id} />
      <TimeStampList videoId={id} />
    </div>
  );
}

export default VideoPage;
