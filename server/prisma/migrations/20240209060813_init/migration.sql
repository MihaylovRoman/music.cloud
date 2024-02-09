-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "image" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Basket" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_list_music" (
    "music_id" INTEGER NOT NULL,
    "basket_id" INTEGER NOT NULL,

    CONSTRAINT "User_list_music_pkey" PRIMARY KEY ("music_id","basket_id")
);

-- CreateTable
CREATE TABLE "Music" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "playtime" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "url_music" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist_music_basket" (
    "id" SERIAL NOT NULL,
    "artist_id" INTEGER NOT NULL,

    CONSTRAINT "Artist_music_basket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "All_music" (
    "music_id" INTEGER NOT NULL,
    "artist_basket" INTEGER NOT NULL,

    CONSTRAINT "All_music_pkey" PRIMARY KEY ("music_id","artist_basket")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Basket_user_id_key" ON "Basket"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_nickname_key" ON "Artist"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_music_basket_artist_id_key" ON "Artist_music_basket"("artist_id");

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_list_music" ADD CONSTRAINT "User_list_music_music_id_fkey" FOREIGN KEY ("music_id") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_list_music" ADD CONSTRAINT "User_list_music_basket_id_fkey" FOREIGN KEY ("basket_id") REFERENCES "Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist_music_basket" ADD CONSTRAINT "Artist_music_basket_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "All_music" ADD CONSTRAINT "All_music_music_id_fkey" FOREIGN KEY ("music_id") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "All_music" ADD CONSTRAINT "All_music_artist_basket_fkey" FOREIGN KEY ("artist_basket") REFERENCES "Artist_music_basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
