import { IsNotEmpty, IsString } from 'class-validator';

export class GreetWorldDto {
  @IsString()
  @IsNotEmpty()
  greeting!: string;
}
