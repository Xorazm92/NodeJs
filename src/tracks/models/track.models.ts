import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface TrackCreationAttrs {
    name: string;
    artistId?: number; 
    albumId?: number; 
    userId: string;
    duration: number; 
}

@Table({tableName:"track",timestamps:false})
export class TrackStatus extends Model<TrackStatus, TrackCreationAttrs>{
    @Column(
        {
            type:DataType.INTEGER,
            autoIncrement:true,
            primaryKey:true
        })
        id: number

    @Column({
        type:DataType.STRING(100),
        allowNull: false,
        unique: true
    })
     name: string;

    @Column({  type:DataType.INTEGER, })
    artistId?: string;

//   @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, { nullable: true })
//   artist?: ArtistEntity;

    @Column({  type:DataType.INTEGER, })
    albumId?: string;

//   @ManyToOne(() => AlbumEntity, (album) => album.tracks, { nullable: true })
//   album?: AlbumEntity;

    @Column({type:DataType.INTEGER})
    duration: number;

//   @ManyToOne(() => UserEntity, (user) => user.tracks)
//   user: UserEntity;

    @Column({type:DataType.INTEGER})
    userId: string;
}