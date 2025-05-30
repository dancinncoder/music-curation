/*
  Warnings:

  - You are about to drop the `playlists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "playlists" DROP CONSTRAINT "playlists_user_uid_fkey";

-- DropTable
DROP TABLE "playlists";

-- CreateTable
CREATE TABLE "playlist" (
    "id" UUID NOT NULL,
    "user_uid" UUID NOT NULL,
    "artist" TEXT NOT NULL,
    "music_title" TEXT NOT NULL,
    "link" TEXT,
    "myTake" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "playlist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "playlist" ADD CONSTRAINT "playlist_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "app_users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
