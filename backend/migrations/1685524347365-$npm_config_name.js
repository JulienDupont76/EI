import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685524347365 {
    name = ' $npmConfigName1685524347365'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" varchar NOT NULL,
                "genre" varchar NOT NULL,
                "popularity" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "rating" integer NOT NULL
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "rating"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
