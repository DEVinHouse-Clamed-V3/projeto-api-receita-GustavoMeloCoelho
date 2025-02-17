import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { RecipeIngredient } from "./RecipeIngredient"; // Importando a entidade relacionada
import { Step } from "./RecipeStep";

@Entity("recipes") // Nome da tabela no banco 

export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  name: string;

  @Column({ type: "time", nullable: false })
  preparation_time: string;

  @Column({ type: "boolean", default: false })
  is_fitness: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  // Relacionamento: Uma receita tem vários ingredientes
  @OneToMany(() => RecipeIngredient, ingredient => ingredient.recipe, {
    cascade: true, // Permite salvar ingredientes junto com a receita
  })
  ingredients: RecipeIngredient[];

  @OneToMany(() => Step, (step) => step.recipe, { cascade: true })
    steps: Step[];
}
