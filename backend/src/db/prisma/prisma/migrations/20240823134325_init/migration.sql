-- CreateTable
CREATE TABLE "startup" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invertor" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "invertor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "startup_email_key" ON "startup"("email");

-- CreateIndex
CREATE UNIQUE INDEX "startup_username_key" ON "startup"("username");

-- CreateIndex
CREATE UNIQUE INDEX "invertor_email_key" ON "invertor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "invertor_username_key" ON "invertor"("username");
