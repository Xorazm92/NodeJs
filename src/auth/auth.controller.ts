import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, LoginResponseDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiBearerAuth,
    ApiBody 
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ 
        status: 201, 
        description: 'User successfully registered',
        type: LoginResponseDto 
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiBody({ type: RegisterDto })
    async register(@Body() registerDto: RegisterDto) {
        const user = await this.authService.createUser(
            registerDto.username,
            registerDto.password,
            registerDto.email
        );
        return this.authService.login(user);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ 
        status: 200, 
        description: 'User successfully logged in',
        type: LoginResponseDto
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(
            loginDto.username,
            loginDto.password
        );
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({ 
        status: 200, 
        description: 'Returns the user profile',
        schema: {
            example: {
                userId: '507f1f77bcf86cd799439011',
                username: 'john_doe',
                roles: ['user']
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    getProfile(@Request() req) {
        return req.user;
    }
}
