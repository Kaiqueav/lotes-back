import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    signIn(
        @Body('username') username:string,
        @Body('password') password:string
    ):AuthResponseDTO {
        return this.authService.signIn(username, password);
    }
}
