import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class ManytoMany1685542919780 {
    name = 'ManytoMany1685542919780'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "collection" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                CONSTRAINT "UQ_926e7bdc3f52cd582078a379f1b" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                CONSTRAINT "UQ_dd8cd9e50dd049656e4be1f7e8c" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "genre_movies_movie" (
                "genreId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("genreId", "movieId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_dff457c114a6294863814818b0" ON "genre_movies_movie" ("genreId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e59764a417d4f8291747b744fa" ON "genre_movies_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_genres_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId")
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "firstname" varchar NOT NULL,
                "lastname" varchar NOT NULL,
                "password" varchar NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"("id", "email", "firstname", "lastname")
            SELECT "id",
                "email",
                "firstname",
                "lastname"
            FROM "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user"
                RENAME TO "user"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_dff457c114a6294863814818b0"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_e59764a417d4f8291747b744fa"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_genre_movies_movie" (
                "genreId" integer NOT NULL,
                "movieId" integer NOT NULL,
                CONSTRAINT "FK_dff457c114a6294863814818b0f" FOREIGN KEY ("genreId") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_e59764a417d4f8291747b744faa" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("genreId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_genre_movies_movie"("genreId", "movieId")
            SELECT "genreId",
                "movieId"
            FROM "genre_movies_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "genre_movies_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_genre_movies_movie"
                RENAME TO "genre_movies_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_dff457c114a6294863814818b0" ON "genre_movies_movie" ("genreId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e59764a417d4f8291747b744fa" ON "genre_movies_movie" ("movieId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_985216b45541c7e0ec644a8dd4"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_1996ce31a9e067304ab168d671"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie_genres_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_1996ce31a9e067304ab168d6715" FOREIGN KEY ("genreId") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie_genres_genre"("movieId", "genreId")
            SELECT "movieId",
                "genreId"
            FROM "movie_genres_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_genres_genre"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie_genres_genre"
                RENAME TO "movie_genres_genre"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_1996ce31a9e067304ab168d671"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_985216b45541c7e0ec644a8dd4"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_genres_genre"
                RENAME TO "temporary_movie_genres_genre"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_genres_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie_genres_genre"("movieId", "genreId")
            SELECT "movieId",
                "genreId"
            FROM "temporary_movie_genres_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie_genres_genre"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_e59764a417d4f8291747b744fa"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_dff457c114a6294863814818b0"
        `);
        await queryRunner.query(`
            ALTER TABLE "genre_movies_movie"
                RENAME TO "temporary_genre_movies_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "genre_movies_movie" (
                "genreId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("genreId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "genre_movies_movie"("genreId", "movieId")
            SELECT "genreId",
                "movieId"
            FROM "temporary_genre_movies_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_genre_movies_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e59764a417d4f8291747b744fa" ON "genre_movies_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_dff457c114a6294863814818b0" ON "genre_movies_movie" ("genreId")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME TO "temporary_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "firstname" varchar NOT NULL,
                "lastname" varchar NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user"("id", "email", "firstname", "lastname")
            SELECT "id",
                "email",
                "firstname",
                "lastname"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_1996ce31a9e067304ab168d671"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_985216b45541c7e0ec644a8dd4"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_genres_genre"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_e59764a417d4f8291747b744fa"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_dff457c114a6294863814818b0"
        `);
        await queryRunner.query(`
            DROP TABLE "genre_movies_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
        await queryRunner.query(`
            DROP TABLE "collection"
        `);
    }
}
