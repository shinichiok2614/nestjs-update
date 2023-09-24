import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InsertNoteDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty() //tao met roi do
  description: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
