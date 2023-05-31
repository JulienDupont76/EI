import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Testmanytomany1685544009943 {
    name = 'Testmanytomany1685544009943'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "collection_genres_genre" (
                "collectionId" integer NOT NULL,
                "genreId" integer NOT NULL,
                PRIMARY KEY ("collectionId", "genreId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b2031cdcbe79f20f5781d87bff" ON "collection_genres_genre" ("collectionId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0d733a1273308119655e99795d" ON "collection_genres_genre" ("genreId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_b2031cdcbe79f20f5781d87bff"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_0d733a1273308119655e99795d"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_collection_genres_genre" (
                "collectionId" integer NOT NULL,
                "genreId" integer NOT NULL,
                CONSTRAINT "FK_b2031cdcbe79f20f5781d87bff3" FOREIGN KEY ("collectionId") REFERENCES "collection" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_0d733a1273308119655e99795db" FOREIGN KEY ("genreId") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("collectionId", "genreId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_collection_genres_genre"("collectionId", "genreId")
            SELECT "collectionId",
                "genreId"
            FROM "collection_genres_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "collection_genres_genre"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_collection_genres_genre"
                RENAME TO "collection_genres_genre"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b2031cdcbe79f20f5781d87bff" ON "collection_genres_genre" ("collectionId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0d733a1273308119655e99795d" ON "collection_genres_genre" ("genreId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_0d733a1273308119655e99795d"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_b2031cdcbe79f20f5781d87bff"
        `);
        await queryRunner.query(`
            ALTER TABLE "collection_genres_genre"
                RENAME TO "temporary_collection_genres_genre"
        `);
        await queryRunner.query(`
            CREATE TABLE "collection_genres_genre" (
                "collectionId" integer NOT NULL,
                "genreId" integer NOT NULL,
                PRIMARY KEY ("collectionId", "genreId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "collection_genres_genre"("collectionId", "genreId")
            SELECT "collectionId",
                "genreId"
            FROM "temporary_collection_genres_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_collection_genres_genre"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0d733a1273308119655e99795d" ON "collection_genres_genre" ("genreId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b2031cdcbe79f20f5781d87bff" ON "collection_genres_genre" ("collectionId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_0d733a1273308119655e99795d"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_b2031cdcbe79f20f5781d87bff"
        `);
        await queryRunner.query(`
            DROP TABLE "collection_genres_genre"
        `);
    }
}
