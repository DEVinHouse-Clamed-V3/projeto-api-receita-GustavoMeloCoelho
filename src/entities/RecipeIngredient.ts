import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Recipe } from "./Recipe"; // Importando a entidade relacionada

@Entity("recipes_ingredients") // Nome da tabela no banco
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  // Relacionamento: Muitos ingredientes pertencem a uma receita
  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  @JoinColumn({ name: "recipe_id"})
  recipe: Recipe;
}
