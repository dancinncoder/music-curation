"use client";
import { getAppUser } from "@/lib/appuser";
import { getPlaylist } from "@/lib/playlist";
import { TypeNewSong } from "@/types/type-newsong";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function PlaylistContainer() {
  // const { data: session } = useSession();
  // console.log("session data from dashboard's child component", session);
  const queryClient = useQueryClient();
  const { data: playlist } = useQuery({
    queryKey: ["playlist"],
    queryFn: getPlaylist,
  });

  const { data: appUsers } = useQuery({
    queryKey: ["appUser"],
    queryFn: getAppUser,
  });

  const [artist, setArtist] = useState<string>("");
  const [musicTitle, setMusicTitle] = useState<string>("");
  const [myTake, setMyTake] = useState<string>("");
  const [link, setLink] = useState<string>("");

  console.log("playlist:", playlist);

  // 함수를 리턴 currying
  const handleOnChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  // maxlength 를 넘었을 때 경고문구 on

  const addNewSong = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Verification

    // Make a new object to CREATE
    const newSong: TypeNewSong = {
      id: uuid(),
      userUid: appUsers.uid,
      artist,
      musicTitle,
      link,
      myTake,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addNewSongMutation.mutate(newSong);
  };

  const addNewSongMutation = useMutation({
    mutationFn: async (newSong: TypeNewSong) => {
      // CREATE request
      const playlistResponse = await fetch("/api/playlist", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newSong),
      });

      const updatedPlaylist = await playlistResponse.json();
      console.log("saved result after CREATE:", updatedPlaylist);
      return updatedPlaylist.data;
    },
    onSuccess: (updatedPlaylist) => {
      // 성공시 playlist React Query 캐시에 저장된 쿼리 데이터 덮어쓰기
      queryClient.setQueryData(["playlist"], updatedPlaylist);
      // 성공시 playlist 쿼리 무효화, 서버 재요청하여 다시 가져오기 (자동 리렌더)
      // queryClient.invalidateQueries({ queryKey: ["playlist"] });

      setArtist("");
      setMusicTitle("");
      setMyTake("");
      setLink("");
    },
    onError: (error: Error) => {
      console.log("Error adding a song:" + error.message);
    },
  });

  return (
    <div>
      {/* PLAYLIST INPUT */}
      <form onSubmit={addNewSong} className="flex flex-col w-[200px]">
        <input
          onChange={handleOnChange(setArtist)}
          value={artist}
          maxLength={20}
          className="border-1"
        />
        <input
          onChange={handleOnChange(setMusicTitle)}
          value={musicTitle}
          maxLength={20}
          className="border-1"
        />
        <input
          onChange={handleOnChange(setMyTake)}
          value={myTake}
          maxLength={25}
          className="border-1"
        />
        <input
          onChange={handleOnChange(setLink)}
          value={link}
          className="border-1"
        />
        <button
          disabled={!appUsers}
          className="border-1 cursor-pointer"
          type="submit"
        >
          Save
        </button>
      </form>
      {/* PLAYLIST VIEW */}
      <div>
        <ul>
          {playlist?.map((song: TypeNewSong) => {
            return (
              <li key={song?.id}>
                <p>artist:{song?.artist}</p>
                <p>music title:{song?.musicTitle}</p>
                <p>my take:{song?.myTake}</p>
                <span>link: </span>
                <span className="cursor-pointer">
                  <a href={song?.link} />
                  {song?.link}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PlaylistContainer;
