-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "seg" TEXT NOT NULL DEFAULT '',
    "ter" TEXT NOT NULL DEFAULT '',
    "qua" TEXT NOT NULL DEFAULT '',
    "qui" TEXT NOT NULL DEFAULT '',
    "sex" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Checkin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeRange" TEXT NOT NULL,
    "vacancies" INTEGER NOT NULL DEFAULT 20,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CheckinToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CheckinToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Checkin" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CheckinToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_userId_key" ON "Workout"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_CheckinToUser_AB_unique" ON "_CheckinToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CheckinToUser_B_index" ON "_CheckinToUser"("B");
