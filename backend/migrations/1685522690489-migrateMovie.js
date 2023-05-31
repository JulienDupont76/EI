import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class migrateMovie1685522690489 {
    name = 'migrateMovie1685522690489'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" integer NOT NULL,
                "overview" varchar NOT NULL,
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
