
import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class CreateRecipeAndIngredients1739586548766 implements MigrationInterface {
    name = 'CreateRecipeAndIngredients1739586548766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adiciona a coluna de chave estrangeira "recipe_id" em "recipes_ingredients"
        await queryRunner.addColumn("recipes_ingredients", 
            new TableColumn({
                name: "recipe_id",
                type: "int",    
                isNullable: false,
            })
        );


        // Garante que os timestamps tenham default "now()"
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "updated_at" SET DEFAULT now()`);

        // Adiciona a chave estrangeira corretamente
        await queryRunner.createForeignKey(
            "recipes_ingredients",
            new TableForeignKey({
                name: "FK_recipes_ingredients_recipe_id",
                columnNames: ["recipe_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "recipes",
                onDelete: "CASCADE",
                
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove a chave estrangeira
        await queryRunner.dropForeignKey("recipes_ingredients", "recipe_id");

        // Remove a coluna recipe_id
        await queryRunner.dropColumn("recipes_ingredients", "recipe_id");

        // Reverte o tamanho do campo name para 100 caracteres
        await queryRunner.changeColumn("recipes_ingredients", "name", 
            new TableColumn({
                name: "name",
                type: "varchar",
                length: "100",
                isNullable: false,
            })
        );

        // Reverte os DEFAULT dos timestamps
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    }
}
