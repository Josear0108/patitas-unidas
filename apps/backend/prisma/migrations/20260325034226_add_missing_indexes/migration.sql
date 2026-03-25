-- CreateEnum
CREATE TYPE "animal_gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "animal_size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "animal_status" AS ENUM ('AVAILABLE', 'ADOPTED', 'IN_CARE', 'DECEASED', 'SPONSORED');

-- CreateEnum
CREATE TYPE "animal_type" AS ENUM ('DOG', 'CAT', 'OTHER');

-- CreateEnum
CREATE TYPE "campaign_status" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "campaign_type" AS ENUM ('DONATION', 'ADOPTION', 'VOLUNTEERING', 'SPONSORSHIP');

-- CreateEnum
CREATE TYPE "foundation_status" AS ENUM ('DRAFT', 'PUBLIC', 'SUSPENDED', 'REJECTED');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('SUPER_ADMIN', 'FOUNDATION_ADMIN');

-- CreateEnum
CREATE TYPE "trait_type" AS ENUM ('PERSONALITY', 'HOME_REQUIREMENT');

-- CreateTable
CREATE TABLE "animal_photos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "animal_id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "animal_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animal_traits" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "animal_id" UUID NOT NULL,
    "type" "trait_type" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "animal_traits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animals" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "foundation_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" "animal_type" NOT NULL,
    "breed" VARCHAR(255),
    "birth_date" TIMESTAMP(6),
    "size" "animal_size",
    "weight" DECIMAL(5,2),
    "gender" "animal_gender" NOT NULL,
    "description" TEXT,
    "city" VARCHAR(255),
    "neighborhood" VARCHAR(255),
    "status" "animal_status" NOT NULL DEFAULT 'AVAILABLE',
    "is_urgent" BOOLEAN NOT NULL DEFAULT false,
    "rescued_at" TIMESTAMP(6),
    "is_vaccinated" BOOLEAN NOT NULL DEFAULT false,
    "is_neutered" BOOLEAN NOT NULL DEFAULT false,
    "is_dewormed" BOOLEAN NOT NULL DEFAULT false,
    "has_microchip" BOOLEAN NOT NULL DEFAULT false,
    "last_checkup_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_rewards" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaign_id" UUID NOT NULL,
    "minimum_amount" DECIMAL(10,2) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "campaign_rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_updates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaign_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "campaign_updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "foundation_id" UUID NOT NULL,
    "animal_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "type" "campaign_type" NOT NULL,
    "is_urgent" BOOLEAN NOT NULL DEFAULT false,
    "status" "campaign_status" NOT NULL DEFAULT 'ACTIVE',
    "goal_amount" DECIMAL(10,2),
    "raised_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'USD',
    "donor_count" INTEGER NOT NULL DEFAULT 0,
    "start_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" VARCHAR(255) NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaign_id" UUID NOT NULL,
    "donor_name" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'USD',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundation_achievements" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "foundation_id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "foundation_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "tagline" VARCHAR(255),
    "description" TEXT,
    "mission" TEXT,
    "vision" TEXT,
    "founded_at" TIMESTAMP(6),
    "logo_url" TEXT,
    "banner_url" TEXT,
    "city" VARCHAR(255),
    "country" VARCHAR(255) NOT NULL DEFAULT 'Colombia',
    "phone" VARCHAR(50),
    "email" VARCHAR(255),
    "website" VARCHAR(255),
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "status" "foundation_status" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "foundations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "google_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "avatar_url" TEXT,
    "role" "role" NOT NULL DEFAULT 'FOUNDATION_ADMIN',
    "foundation_id" UUID,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_animal_photos_animal_id_is_primary" ON "animal_photos"("animal_id", "is_primary");

-- CreateIndex
CREATE INDEX "idx_animals_traits_animal_id" ON "animal_traits"("animal_id");

-- CreateIndex
CREATE INDEX "idx_animals_traits_type_description" ON "animal_traits"("type", "description");

-- CreateIndex
CREATE INDEX "idx_animals_foundation_id" ON "animals"("foundation_id");

-- CreateIndex
CREATE INDEX "idx_animals_is_urgent" ON "animals"("is_urgent");

-- CreateIndex
CREATE INDEX "idx_animals_status" ON "animals"("status");

-- CreateIndex
CREATE INDEX "idx_animals_status_urgent" ON "animals"("status", "is_urgent");

-- CreateIndex
CREATE INDEX "idx_animals_type" ON "animals"("type");

-- CreateIndex
CREATE INDEX "idx_campaign_rewards_campaign_id" ON "campaign_rewards"("campaign_id");

-- CreateIndex
CREATE INDEX "idx_campaign_updates_campaign_id" ON "campaign_updates"("campaign_id");

-- CreateIndex
CREATE UNIQUE INDEX "campaigns_slug_key" ON "campaigns"("slug");

-- CreateIndex
CREATE INDEX "idx_campaigns_animal_id" ON "campaigns"("animal_id");

-- CreateIndex
CREATE INDEX "idx_campaigns_foundation_id" ON "campaigns"("foundation_id");

-- CreateIndex
CREATE INDEX "idx_campaigns_status" ON "campaigns"("status");

-- CreateIndex
CREATE INDEX "idx_donations_campaign_id" ON "donations"("campaign_id");

-- CreateIndex
CREATE INDEX "idx_foundation_achievements_foundation_id" ON "foundation_achievements"("foundation_id");

-- CreateIndex
CREATE UNIQUE INDEX "foundations_slug_key" ON "foundations"("slug");

-- CreateIndex
CREATE INDEX "idx_foundations_slug" ON "foundations"("slug");

-- CreateIndex
CREATE INDEX "idx_foundations_status" ON "foundations"("status");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_google_id" ON "users"("google_id");

-- CreateIndex
CREATE INDEX "idx_users_foundation_id" ON "users"("foundation_id");

-- AddForeignKey
ALTER TABLE "animal_photos" ADD CONSTRAINT "animal_photos_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "animal_traits" ADD CONSTRAINT "animal_traits_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_foundation_id_fkey" FOREIGN KEY ("foundation_id") REFERENCES "foundations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "campaign_rewards" ADD CONSTRAINT "campaign_rewards_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "campaign_updates" ADD CONSTRAINT "campaign_updates_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_foundation_id_fkey" FOREIGN KEY ("foundation_id") REFERENCES "foundations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "foundation_achievements" ADD CONSTRAINT "foundation_achievements_foundation_id_fkey" FOREIGN KEY ("foundation_id") REFERENCES "foundations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_foundation_id_fkey" FOREIGN KEY ("foundation_id") REFERENCES "foundations"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
