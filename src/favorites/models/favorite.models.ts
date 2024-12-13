// export class Favorite {}
 
// import { 
//     Column, 
//     DataType, 
//     Table, Model, 
//     ForeignKey,
//     BelongsTo
//   } from 'sequelize-typescript';
// import { Albums } from 'src/albums/models/album.models';
// import { Users } from 'src/users/models/user.model';

  
//   interface FavoriteCreate {
//     userId: number;
//     atrtistId: number;
//     albumsId: number;
//     tracksId: number;
//   }
  
//   @Table({ tableName: "fovorite", timestamps: false })
//   export class fovorites extends Model<fovorites, FavoriteCreate> {
//     @Column({
//       type: DataType.INTEGER,
//       autoIncrement: true, 
//       primaryKey: true,
//     })
//     id?: number;
  
//     @ForeignKey(() => Users)
//     @Column({
//         type:DataType.INTEGER
//     })
//     userId:number

//     @BelongsTo(() => Users)
//     favorite:Users

//     @ForeignKey(() => Artists)
//     @Column({
//         type:DataType.INTEGER
//     })
//     artistId:number

//     @BelongsTo(() => Artists)
//     favorite:Artists

//     @ForeignKey(() => Albums)
//     @Column({
//         type:DataType.INTEGER
//     })
//     artistId:number

//     @BelongsTo(() => Users)
//     artist:Artists

//     @ForeignKey(() =>tracksId)
//     @Column({
//         type:DataType.INTEGER
//     })
//     tracksId:number

//     @BelongsTo(() => )
//     tracksId
//   }
  


import { 
    Column, 
    DataType, 
    Table, 
    Model, 
    ForeignKey, 
    BelongsTo 
  } from 'sequelize-typescript';
  import { Albums } from 'src/albums/models/album.models';
  import { Users } from 'src/users/models/user.model';
//   import { Artists } from 'src/artists/models/artist.model'; 
//   import { Tracks } from 'src/tracks/models/track.model'; 
  
  interface FavoriteCreate {
    userId: number;
    artistId: number;
    albumId: number;
    trackId: number;
  }
  
  @Table({ tableName: "favorites", timestamps: false }) // Table nomi "favorites" bo'ldi
  export class Favorites extends Model<Favorites, FavoriteCreate> {
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true, 
      primaryKey: true,
    })
    id?: number;
  
    @ForeignKey(() => Users)
    @Column({
      type: DataType.INTEGER
    })
    userId: number;
  
    @BelongsTo(() => Users)
    user: Users;
  
    // @ForeignKey(() => Artists)
    // @Column({
    //   type: DataType.INTEGER
    // })
    // artistId: number;
  
    // @BelongsTo(() => Artists)
    // artist: Artists;
  
    @ForeignKey(() => Albums)
    @Column({
      type: DataType.INTEGER
    })
    albumId: number;
  
    @BelongsTo(() => Albums)
    album: Albums;
  
//     @ForeignKey(() => Tracks)
//     @Column({
//       type: DataType.INTEGER
//     })
//     trackId: number;
  
//     @BelongsTo(() => Tracks)
//     track: Tracks;


  }