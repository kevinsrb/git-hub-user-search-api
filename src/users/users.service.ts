import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';
import { validate as isUUID } from 'uuid';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('ProductsService');

  constructor(

    @InjectRepository(User)
    private readonly userRespositoty: Repository<User>,

  ) {}



  async create(createUserDto: CreateUserDto) {
    
    try {

      const product = this.userRespositoty.create(createUserDto);
      await this.userRespositoty.save( product );

      return product;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }


  }


  findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.userRespositoty.find({
      take: limit,
      skip: offset,
      // TODO: relaciones
    })
  }

  async existUser( id: number ) {

    let user: User;

    user = await this.userRespositoty.findOneBy({ id });

    if ( !user ) 
      return false;

    return true;
  }


  async findOne( id: number ) {
    let user: User;
    user = await this.userRespositoty.findOneBy({ id });

    if ( !user ) 
      throw new NotFoundException(`Product with ${ id } not found`);

    return user;
  }



  async remove(id: number) {
    const user = await this.findOne( id );
    await this.userRespositoty.remove( user );
    
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

}
