import { IsNumber, IsString } from "class-validator";

export class CreateKnowledgeArticleDto {
  @IsString()
  title!: string;

  @IsString()
  category!: string;

  @IsString()
  audience!: string;

  @IsNumber()
  readTimeMinutes!: number;
}
