import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    // console.log(paginationDto)
    return this.usersService.findAll( paginationDto );
  }

  @Get(':id')
  findOne(@Param( 'id' ) id: number) {
    return this.usersService.existUser( id );
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove( id );
  }
}
