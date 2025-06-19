-- CreateTable
CREATE TABLE "Etude" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Etude_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "description" TEXT,
    "weekNumber" INTEGER NOT NULL,
    "orderInWeek" INTEGER NOT NULL,
    "etudeId" INTEGER NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cohort" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cohort_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cohortId" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CohortEtudeProgress" (
    "id" SERIAL NOT NULL,
    "cohortId" INTEGER NOT NULL,
    "etudeId" INTEGER NOT NULL,
    "startWeek" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CohortEtudeProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CohortEtudeProgress_cohortId_etudeId_key" ON "CohortEtudeProgress"("cohortId", "etudeId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_etudeId_fkey" FOREIGN KEY ("etudeId") REFERENCES "Etude"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "Cohort"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CohortEtudeProgress" ADD CONSTRAINT "CohortEtudeProgress_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "Cohort"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CohortEtudeProgress" ADD CONSTRAINT "CohortEtudeProgress_etudeId_fkey" FOREIGN KEY ("etudeId") REFERENCES "Etude"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
