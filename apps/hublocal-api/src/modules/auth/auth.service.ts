import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('Email recebido:', email);
    const user = await this.usersService.findByEmail(email);

    if (!user) {
        console.log('ERRO: Usuário não encontrado no banco de dados.');
        return null;
    }

    console.log('Usuário encontrado:', user.email);
    console.log('Hash da senha no banco:', user.password);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      console.log("RESULT: ", result)
      return result;
    }
    console.log('ERRO: As senhas não correspondem (bcrypt.compare falhou).');
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
    };
  }
}
