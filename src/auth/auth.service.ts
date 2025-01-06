import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        try {
            const user = await this.userModel.findOne({ username }).exec();
            
            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }

            // Update last login
            user.lastLogin = new Date();
            await user.save();

            const { password: _, ...result } = user.toJSON();
            return result;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new UnauthorizedException('Authentication failed');
        }
    }

    async login(user: any) {
        try {
            const payload = { 
                username: user.username, 
                sub: user._id,
                roles: user.roles 
            };
            
            return {
                access_token: this.jwtService.sign(payload),
                user: {
                    id: user._id,
                    username: user.username,
                    roles: user.roles,
                    email: user.email,
                    lastLogin: user.lastLogin
                }
            };
        } catch (error) {
            throw new UnauthorizedException('Login failed');
        }
    }

    async createUser(username: string, password: string, email?: string): Promise<UserDocument> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            username,
            password: hashedPassword,
            email,
            roles: ['user'],
            isActive: true
        });
        return user.save();
    }

    async findUserById(id: string): Promise<UserDocument> {
        return this.userModel.findById(id).exec();
    }

    async findUserByUsername(username: string): Promise<UserDocument> {
        return this.userModel.findOne({ username }).exec();
    }
}
