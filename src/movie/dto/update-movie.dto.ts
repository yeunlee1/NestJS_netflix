import { PartialType } from '@nestjs/mapped-types';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
