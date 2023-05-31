import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class deleteUniqueTitle1685539240655 {
    name = 'deleteUniqueTitle1685539240655'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "overview" varchar NOT NULL DEFAULT (''),
                "adult" boolean NOT NULL,
                "backdrop_path" varchar,
                "belongs_to_collection" varchar,
                "budget" integer NOT NULL DEFAULT (0),
                "genres" varchar NOT NULL DEFAULT (''),
                "idTMDB" integer NOT NULL,
                "original_language" varchar NOT NULL,
                "original_title" varchar NOT NULL,
                "popularity" integer NOT NULL DEFAULT (0),
                "poster_path" varchar,
                "release_date" varchar NOT NULL,
                "revenue" integer NOT NULL DEFAULT (0),
                "runtime" integer NOT NULL DEFAULT (0),
                "status" varchar NOT NULL,
                "tagline" varchar NOT NULL DEFAULT (''),
                "video" varchar,
                "vote_average" integer NOT NULL DEFAULT (0),
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "title",
                    "overview",
                    "adult",
                    "backdrop_path",
                    "belongs_to_collection",
                    "budget",
                    "genres",
                    "idTMDB",
                    "original_language",
                    "original_title",
                    "popularity",
                    "poster_path",
                    "release_date",
                    "revenue",
                    "runtime",
                    "status",
                    "tagline",
                    "video",
                    "vote_average"
                )
            SELECT "id",
                "title",
                "overview",
                "adult",
                "backdrop_path",
                "belongs_to_collection",
                "budget",
                "genres",
                "idTMDB",
                "original_language",
                "original_title",
                "popularity",
                "poster_path",
                "release_date",
                "revenue",
                "runtime",
                "status",
                "tagline",
                "video",
                "vote_average"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "overview" varchar NOT NULL DEFAULT (''),
                "adult" boolean NOT NULL,
                "backdrop_path" varchar,
                "belongs_to_collection" varchar,
                "budget" integer NOT NULL DEFAULT (0),
                "genres" varchar NOT NULL DEFAULT (''),
                "idTMDB" integer NOT NULL,
                "original_language" varchar NOT NULL,
                "original_title" varchar NOT NULL,
                "popularity" integer NOT NULL DEFAULT (0),
                "poster_path" varchar,
                "release_date" varchar NOT NULL,
                "revenue" integer NOT NULL DEFAULT (0),
                "runtime" integer NOT NULL DEFAULT (0),
                "status" varchar NOT NULL,
                "tagline" varchar NOT NULL DEFAULT (''),
                "video" varchar,
                "vote_average" integer NOT NULL DEFAULT (0),
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "title",
                    "overview",
                    "adult",
                    "backdrop_path",
                    "belongs_to_collection",
                    "budget",
                    "genres",
                    "idTMDB",
                    "original_language",
                    "original_title",
                    "popularity",
                    "poster_path",
                    "release_date",
                    "revenue",
                    "runtime",
                    "status",
                    "tagline",
                    "video",
                    "vote_average"
                )
            SELECT "id",
                "title",
                "overview",
                "adult",
                "backdrop_path",
                "belongs_to_collection",
                "budget",
                "genres",
                "idTMDB",
                "original_language",
                "original_title",
                "popularity",
                "poster_path",
                "release_date",
                "revenue",
                "runtime",
                "status",
                "tagline",
                "video",
                "vote_average"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "overview" varchar NOT NULL DEFAULT (''),
                "adult" boolean NOT NULL,
                "backdrop_path" varchar,
                "belongs_to_collection" varchar,
                "budget" integer NOT NULL DEFAULT (0),
                "genres" varchar NOT NULL DEFAULT (''),
                "idTMDB" integer NOT NULL,
                "original_language" varchar NOT NULL,
                "original_title" varchar NOT NULL,
                "popularity" integer NOT NULL DEFAULT (0),
                "poster_path" varchar,
                "release_date" varchar NOT NULL,
                "revenue" integer NOT NULL DEFAULT (0),
                "runtime" integer NOT NULL DEFAULT (0),
                "status" varchar NOT NULL,
                "tagline" varchar NOT NULL DEFAULT (''),
                "video" varchar,
                "vote_average" integer NOT NULL DEFAULT (0),
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "title",
                    "overview",
                    "adult",
                    "backdrop_path",
                    "belongs_to_collection",
                    "budget",
                    "genres",
                    "idTMDB",
                    "original_language",
                    "original_title",
                    "popularity",
                    "poster_path",
                    "release_date",
                    "revenue",
                    "runtime",
                    "status",
                    "tagline",
                    "video",
                    "vote_average"
                )
            SELECT "id",
                "title",
                "overview",
                "adult",
                "backdrop_path",
                "belongs_to_collection",
                "budget",
                "genres",
                "idTMDB",
                "original_language",
                "original_title",
                "popularity",
                "poster_path",
                "release_date",
                "revenue",
                "runtime",
                "status",
                "tagline",
                "video",
                "vote_average"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "overview" varchar NOT NULL DEFAULT (''),
                "adult" boolean NOT NULL,
                "backdrop_path" varchar,
                "belongs_to_collection" varchar,
                "budget" integer NOT NULL DEFAULT (0),
                "genres" varchar NOT NULL DEFAULT (''),
                "idTMDB" integer NOT NULL,
                "original_language" varchar NOT NULL,
                "original_title" varchar NOT NULL,
                "popularity" integer NOT NULL DEFAULT (0),
                "poster_path" varchar,
                "release_date" varchar NOT NULL,
                "revenue" integer NOT NULL DEFAULT (0),
                "runtime" integer NOT NULL DEFAULT (0),
                "status" varchar NOT NULL,
                "tagline" varchar NOT NULL DEFAULT (''),
                "video" varchar,
                "vote_average" integer NOT NULL DEFAULT (0),
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "title",
                    "overview",
                    "adult",
                    "backdrop_path",
                    "belongs_to_collection",
                    "budget",
                    "genres",
                    "idTMDB",
                    "original_language",
                    "original_title",
                    "popularity",
                    "poster_path",
                    "release_date",
                    "revenue",
                    "runtime",
                    "status",
                    "tagline",
                    "video",
                    "vote_average"
                )
            SELECT "id",
                "title",
                "overview",
                "adult",
                "backdrop_path",
                "belongs_to_collection",
                "budget",
                "genres",
                "idTMDB",
                "original_language",
                "original_title",
                "popularity",
                "poster_path",
                "release_date",
                "revenue",
                "runtime",
                "status",
                "tagline",
                "video",
                "vote_average"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
