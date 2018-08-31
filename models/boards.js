module.exports = function(sequelize, DataTypes){
    const Board = sequelize.define('Board', {
        board_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        board_description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Board.associate = (models) => {
        // 1 to many relationship with dares
        Board.hasMany(models.Dares, {
            foreignKey: 'dareId'
        });
    }

    return Board;
}