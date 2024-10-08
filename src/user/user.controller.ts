import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
    constructor( private readonly UserService: UserService){}
    @Post()
    create(@Body()users: UserDTO){
        this.UserService.create(users);
    }
}
