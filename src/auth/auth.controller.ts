import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register user endpoint (previously implemented)
  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.registerUser(body.email, body.password);
  }

  // Login user endpoint
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.loginUser(body.email, body.password);
  }
}
