import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ArtistsModule } from "./artists/artists.module";
import { TracksModule } from "./tracks/tracks.module";
import { AlbumsModule } from "./albums/albums.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { Users } from "./users/models/user.model";


@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,

      models: [
        Users,
      ],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class AppModule {}
