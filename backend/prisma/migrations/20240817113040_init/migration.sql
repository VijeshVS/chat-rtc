-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "digitalNumber" INTEGER NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_digitalNumber_key" ON "User"("digitalNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
