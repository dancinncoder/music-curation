"use client";
import { getPlaylist } from "@/lib/playlists";
import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
import React from "react";

function PlaylistContainer() {
  // const { data: session } = useSession();
  // console.log("session data from dashboard's child component", session);
  const { data: playlist, isLoading } = useQuery({
    queryKey: ["playlist"],
    queryFn: getPlaylist,
  });

  console.log("playlist:", playlist);

  if (isLoading) {
    return <p>Loading your playlist...</p>;
  }

  return (
    <div>
      <p>artist:{playlist?.artist}</p>
      <p>music title:{playlist?.musicTitle}</p>
      <p>my take:{playlist?.myTake}</p>
      <span>link: </span>
      <a href={playlist?.link} />
    </div>
  );
}

export default PlaylistContainer;
