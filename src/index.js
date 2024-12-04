import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize(
    'postgres://postgres:postgres@localhost:5432/orm',
)

// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres
// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });

try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}

// =================== 1 ==================
// const User = sequelize.define(
//   'User',
//   {
//     // Model attributes are defined here
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       // allowNull defaults to true
//     },
//   },
//   {
//     // Other model options go here
//   },
// );

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

// =================== 2 ==================
class User extends Model { }

User.init(
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
    },
)

// the defined model is the class itself
// console.log(User === sequelize.models.User) // true

// const user = new User({ firstName: 'bekzodbek', lastName: 'Qodirov' })

// console.log(user);

// (async () => {
//   await sequelize.sync({ force: false });
//   // Code here
// })();

// user.save()

const users = await User.findAll()

console.log(users);
