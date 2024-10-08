import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthResponseDTO } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt'
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){
        this.jwtExpirationTimeInSeconds =+this.configService.get<number>('JWT_EXPIRRATION_TIME');
    }
    singIn(username:string, password:string):AuthResponseDTO{
        const foundUser =  this.userService.findByUserName(username);

        if(!foundUser || bcryptCompareSync(password, foundUser.password)){
            throw new  UnauthorizedException();
        }

        const payload = {sub: foundUser.id, username: foundUser.username};
        const token = this.jwtService.sign(payload);

        return {token, expiresIn: this.jwtExpirationTimeInSeconds}
    }
}
