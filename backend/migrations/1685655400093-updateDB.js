import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class updateDB1685655400093 {
    name = 'updateDB1685655400093'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "adult" boolean NOT NULL,
                "backdrop_path" varchar,
                "collectionid" varchar,
                "budget" integer NOT NULL DEFAULT (0),
                "genres" varchar NOT NULL DEFAULT (''),
                "idTMDB" integer NOT NULL,
                "original_language" varchar NOT NULL,
                "original_title" varchar NOT NULL,
                "overview" varchar NOT NULL DEFAULT (''),
                "popularity" integer NOT NULL DEFAULT (0),
                "poster_path" varchar,
                "release_date" varchar NOT NULL,
                "revenue" integer NOT NULL DEFAULT (0),
                "runtime" integer NOT NULL DEFAULT (0),
                "status" varchar NOT NULL,
                "tagline" varchar NOT NULL DEFAULT (''),
                "title" varchar NOT NULL,
                "video" varchar,
                "vote_average" integer NOT NULL DEFAULT (0)
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "adult",
                    "backdrop_path",
                    "collectionid",
                    "budget",
                    "genres",
                    "idTMDB",
                    "original_language",
                    "original_title",
                    "overview",
                    "popularity",
                    "poster_path",
                    "release_date",
                    "revenue",
                    "runtime",
                    "status",
                    "tagline",
                    "title",
                    "video",
                    "vote_average"
                )
            SELECT "id",
                "adult",
                "backdrop_path",
                "belongs_to_collection",
                "budget",
                "genres",
                "idTMDB",
                "original_language",
                "original_title",
                "overview",
                "popularity",
                "poster_path",
                "release_date",
                "revenue",
                "runtime",
                "status",
                "tagline",
                "title",
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
            CREATE TABLE "movie_genre" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "idmovie" integer NOT NULL,
                "idgenre" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "adult" boolean NOT NULL,
                "backdrop_path" varchar,
                "collectionid" integer,
                "budget" integer NOT NULL DEFAULT (0),
                "genres" varchar NOT NULL DEFAULT (''),
                "idTMDB" integer NOT NULL,
                "original_language" varchar NOT NULL,
                "original_title" varchar NOT NULL,
                "overview" varchar NOT NULL DEFAULT (''),
                "popularity" integer NOT NULL DEFAULT (0),
                "poster_path" varchar,
                "release_date" varchar NOT NULL,
                "revenue" integer NOT NULL DEFAULT (0),
                "runtime" integer NOT NULL DEFAULT (0),
                "status" varchar NOT NULL,
                "tagline" varchar NOT NULL DEFAULT (''),
                "title" varchar NOT NULL,
                "video" varchar,
                "vote_average" integer NOT NULL DEFAULT (0)
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "adult",
                    "backdrop_path",
                    "collectionid",
                    "budget",
                    "genres",
                    "idTMDB",
                    "original_language",
                    "original_title",
                    "overview",
                    "popularity",
                    "poster_path",
                    "release_date",
                    "revenue",
                    "runtime",
                    "status",
                    "tagline",
                    "title",
                    "video",
                    "vote_average"
                )
            SELECT "id",
                "adult",
                "backdrop_path",
                "collectionid",
                "budget",
                "genres",
                "idTMDB",
                "original_language",
                "original_title",
                "overview",
                "popularity",
                "poster_path",
                "release_date",
                "revenue",
                "runtime",
                "status",
                "tagline",
                "title",
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
                "adult" boolean NOT NULL,
                "backdrop_path" varchar,
                "collectionid" varchar,
                "budget" integer NOT NULL DEFAULT (0),
                "genres" varchar NOT NULL DEFAULT (''),
                "idTMDB" integer NOT NULL,
                "original_language" varchar NOT NULL,
                "original_title" varchar NOT NULL,
                "overview" varchar NOT NULL DEFAULT (''),
                "popularity" integer NOT NULL DEFAULT (0),
                "poster_path" varchar,
                "release_date" varchar NOT NULL,
                "revenue" integer NOT NULL DEFAULT (0),
                "runtime" integer NOT NULL DEFAULT (0),
                "status" varchar NOT NULL,
                "tagline" varchar NOT NULL DEFAULT (''),
                "title" varchar NOT NULL,
                "video" varchar,
                "vote_average" integer NOT NULL DEFAULT (0)
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "adult",
                    "backdrop_path",
                    "collectionid",
                    "budget",
                    "genres",
                    "idTMDB",
                    "original_language",
                    "original_title",
                    "overview",
                    "popularity",
                    "poster_path",
                    "release_date",
                    "revenue",
                    "runtime",
                    "status",
                    "tagline",
                    "title",
                    "video",
                    "vote_average"
                )
            SELECT "id",
                "adult",
                "backdrop_path",
                "collectionid",
                "budget",
                "genres",
                "idTMDB",
                "original_language",
                "original_title",
                "overview",
                "popularity",
                "poster_path",
                "release_date",
                "revenue",
                "runtime",
                "status",
                "tagline",
                "title",
                "video",
                "vote_average"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_genre"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "adult" boolean NOT NULL,
                "backdrop_path" varchar,
                "belongs_to_collection" varchar,
                "budget" integer NOT NULL DEFAULT (0),
                "genres" varchar NOT NULL DEFAULT (''),
                "idTMDB" integer NOT NULL,
                "original_language" varchar NOT NULL,
                "original_title" varchar NOT NULL,
                "overview" varchar NOT NULL DEFAULT (''),
                "popularity" integer NOT NULL DEFAULT (0),
                "poster_path" varchar,
                "release_date" varchar NOT NULL,
                "revenue" integer NOT NULL DEFAULT (0),
                "runtime" integer NOT NULL DEFAULT (0),
                "status" varchar NOT NULL,
                "tagline" varchar NOT NULL DEFAULT (''),
                "title" varchar NOT NULL,
                "video" varchar,
                "vote_average" integer NOT NULL DEFAULT (0)
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "adult",
                    "backdrop_path",
                    "belongs_to_collection",
                    "budget",
                    "genres",
                    "idTMDB",
                    "original_language",
                    "original_title",
                    "overview",
                    "popularity",
                    "poster_path",
                    "release_date",
                    "revenue",
                    "runtime",
                    "status",
                    "tagline",
                    "title",
                    "video",
                    "vote_average"
                )
            SELECT "id",
                "adult",
                "backdrop_path",
                "collectionid",
                "budget",
                "genres",
                "idTMDB",
                "original_language",
                "original_title",
                "overview",
                "popularity",
                "poster_path",
                "release_date",
                "revenue",
                "runtime",
                "status",
                "tagline",
                "title",
                "video",
                "vote_average"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
