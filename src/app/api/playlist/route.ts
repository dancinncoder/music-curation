import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      userUid,
      artist,
      musicTitle,
      link,
      myTake,
      createdAt,
      updatedAt,
    } = body;

    const newSongData = await prisma.playlist.create({
      data: {
        id,
        userUid,
        artist,
        musicTitle,
        link,
        myTake,
        createdAt,
        updatedAt,
      },
    });

    console.log("3 newSongDatA:", newSongData);
    // 전체 목록 다시 조회
    const updatedPlaylist = await prisma.playlist.findMany({
      where: { userUid },
      orderBy: { createdAt: "desc" },
    });

    console.log("4 전체목록다시조회:", updatedPlaylist);

    return NextResponse.json({
      success: true,
      message: "a new song has added successfully.",
      state: 200,
      data: updatedPlaylist, // 전체 배열 반환
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      state: 500,
    });
  }
}
