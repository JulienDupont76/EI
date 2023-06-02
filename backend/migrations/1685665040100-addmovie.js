import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class addmovie1685665040100 {
    name = 'addmovie1685665040100'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "adult" boolean NOT NULL,
                "backdrop_path" varchar,
                "collectionid" integer,
                "budget" integer NOT NULL DEFAULT (0),
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
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
