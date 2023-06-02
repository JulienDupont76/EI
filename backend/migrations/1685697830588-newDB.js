import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class newDB1685697830588 {
    name = 'newDB1685697830588'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "user_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "iduser" integer NOT NULL,
                "idmovie" integer NOT NULL,
                "watched" boolean NOT NULL DEFAULT (0),
                "vote" integer,
                "pred" integer
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "user_movie"
        `);
    }
}
