import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
    @IsString()
    @MinLength(3)
    username: string;

    @ApiProperty({ 
        example: 'password123', 
        description: 'The password of the user',
        minLength: 6 
    })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiPropertyOptional({ 
        example: 'john@example.com',
        description: 'The email of the user'
    })
    @IsEmail()
    @IsOptional()
    email?: string;
}

export class LoginDto {
    @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
    @IsString()
    username: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsString()
    password: string;
}

export class LoginResponseDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT access token'
    })
    access_token: string;

    @ApiProperty({
        example: {
            id: '507f1f77bcf86cd799439011',
            username: 'john_doe',
            email: 'john@example.com',
            roles: ['user']
        },
        description: 'User information'
    })
    user: {
        id: string;
        username: string;
        email?: string;
        roles: string[];
    };
}
