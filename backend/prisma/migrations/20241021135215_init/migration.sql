-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "portfolio" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Startup" (
    "id" TEXT NOT NULL,
    "startupname" TEXT NOT NULL,
    "startupemail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "founder" TEXT NOT NULL,
    "foundedin" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "employees" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "revenuemodel" TEXT NOT NULL,
    "profits" TEXT NOT NULL,
    "previousfunds" TEXT NOT NULL,
    "cashburnt" TEXT NOT NULL,
    "fundamount" TEXT NOT NULL,
    "valuation" TEXT NOT NULL,
    "equityratio" TEXT NOT NULL,
    "investorId" TEXT,

    CONSTRAINT "Startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_userId_key" ON "Investor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Startup_startupemail_key" ON "Startup"("startupemail");

-- AddForeignKey
ALTER TABLE "Investor" ADD CONSTRAINT "Investor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Startup" ADD CONSTRAINT "Startup_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
