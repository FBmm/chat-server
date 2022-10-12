import { Controller, Get, Post, Body, Res, Patch, HttpStatus, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/test-create')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    createUserDto = {
      name: '123121'
    }
    const user = await this.userService.create(createUserDto);
    if (user) {
      return res.status(HttpStatus.OK).send(user)
    } else {
      return res.status(HttpStatus.OK).send(null)
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
