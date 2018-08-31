module.exports = function(sequelize, DataTypes){
    const Users = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    Users.associate = (models) => {
        // 1 to many relationship with dares
        Users.hasMany(models.Dares, {
            foreignKey: 'creatorId'
        });
    }

    return Users;
}