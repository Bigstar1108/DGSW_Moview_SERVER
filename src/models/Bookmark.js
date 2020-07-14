import sequelize, { DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
    const Bookmark = sequelize.define('bookmark', {
        id : {
            field : 'id',
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        movieId : {
            field : 'movieId',
            type : DataTypes.STRING(200),
            allowNull : false
        },
        name : {
            field : 'name',
            type : DataTypes.STRING(200),
            allowNull : false
        },
        movieTitle : {
            field : 'movieTitle',
            type : DataTypes.STRING(200),
            allowNull : false
        },
        movieDate : {
            field : 'movieDate',
            type : DataTypes.STRING(200),
            allowNull : false
        },
        moviePoster : {
            field : 'moviePoster',
            type : DataTypes.STRING(200),
            allowNull : false
        }
    }, {
        tableName : 'bookmark'
    });

    Bookmark.findBookmark = (movieId, name) => Bookmark.findOne({
        where : {
            movieId,
            name
        },
        raw : true,
    });

    Bookmark.getBookmarkByName = (name) => Bookmark.findAll({
        where : {
            name
        },
        raw : true,
    });

    Bookmark.DeleteBookmark = (id) => Bookmark.destroy({
        where : {
            id
        },
        raw : true,
    })

    return Bookmark;
}