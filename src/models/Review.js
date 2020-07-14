import sequelize, { DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
    const Review = sequelize.define('review', {
        //리뷰 id
        id : {
            field : 'id',
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        //작성자
        author : {
            field : 'author',
            type : DataTypes.STRING(50),
            allowNull : false
        },
        //리뷰 title
        title : {
            field : 'title',
            type : DataTypes.STRING(200),
            allowNull : false
        },
        //리뷰 내용
        content : {
            field : 'content',
            type : DataTypes.STRING(200),
            allowNull : false
        },
        //영화 id
        movieId : {
            field : 'movieId',
            type : DataTypes.STRING(50),
            allowNull : false
        },
        movieName : {
            field : 'movieName',
            type : DataTypes.STRING(200),
            allowNull : false
        },
        movieDate : {
            field : 'movieDate',
            type : DataTypes.STRING(200),
            allowNull : false
        },
        vote : {
            field : 'vote',
            type : DataTypes.STRING(50),
            allowNull : false
        },
        createdAt: {
            field : 'createdAt',
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue : sequelize.fn('NOW')
        },
          updatedAt: {
            field : 'updatedAt',
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue : sequelize.fn('NOW')
        }
    }, {
        tableName : 'review',
        timestamps : false
    });

    Review.findReviewByName = (author) => Review.findAll({
        where : {
            author
        },
        raw : true,
    });

    Review.findReviewByMovieId = (movieId) => Review.findOne({
        where : {
            movieId
        },
        raw : true,
    });

    Review.deleteReviewById = (id) => Review.destroy({
        where : {
            id
        },
        raw : true,
    });

    Review.getAllReview = () => Review.findAll({
        raw : true
    });

    return Review;
}