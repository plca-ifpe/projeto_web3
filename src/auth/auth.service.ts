import { ConflictException, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async register(username: string, email:string, password: string ) {
        const exists = await this.userRepository.findOne({where: [{username: username}, {email: email}]})
        if (exists) throw new ConflictException(`Username ou email já cadastrado.`)
        const hashed_password = await bcrypt.hash(password, 10)
        const user = this.userRepository.create({username, email, password:hashed_password, role: 'CLIENT'})

        const saved_user = await this.userRepository.save(user)
        const { password: _, ...user_without_password} = saved_user
        return user_without_password
    }

    async login(username: string, password: string) {
        const user = await this.userRepository.findOne({where: {username}})
        if (!user || await !(bcrypt.compare(password, user.password)))
            throw new UnauthorizedException(`Credenciais inválidas ou usuário inexistente.`)

        const payload = {sub: user.id, username: user.username, role: user.role}
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async me(userId: number) {
        const user = await this.userRepository.findOne({
        where: { id: userId}
        });

        if (!user) {
        throw new NotFoundException(`Usuário ${userId} não encontrado.`);
        }

        return {
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    }
}
