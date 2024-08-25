-- CreateTable
CREATE TABLE "startup" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investor" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "investor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "startup_email_key" ON "startup"("email");

-- CreateIndex
CREATE UNIQUE INDEX "startup_username_key" ON "startup"("username");

-- CreateIndex
CREATE UNIQUE INDEX "investor_email_key" ON "investor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "investor_username_key" ON "investor"("username");
