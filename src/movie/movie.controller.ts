import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieTitleValidationPipe } from './pipe/movie-title-validation.pipe';

@Controller('movie')
@UseInterceptors(ClassSerializerInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies(@Query('title', MovieTitleValidationPipe) title?: string) {
    return this.movieService.findAll(title);
  }

  @Get(':id')
  getMovie(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory(error) {
          throw new BadRequestException('숫자를 입력해주세요!');
        },
      }),
    )
    id: number,
  ) {
    return this.movieService.findOne(id);
  }

  @Post()
  postMovie(@Body() body: CreateMovieDto) {
    return this.movieService.create(body);
  }

  @Patch(':id')
  patchMovie(@Param('id', ParseIntPipe) id: string, @Body() body: UpdateMovieDto) {
    return this.movieService.update(+id, body);
  }

  @Delete(':id')
  deleteMovie(@Param('id', ParseIntPipe) id: string) {
    return this.movieService.remove(+id);
  }
}
