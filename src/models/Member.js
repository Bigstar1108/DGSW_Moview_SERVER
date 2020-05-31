import sequelize from 'sequelize';
const Op = sequelize.Op;

export default (sequelize, DataTypes) => {
    const Member = sequelize.define('member', {
        // 회원 id
        id : {
            field : 'id',
            type : DataTypes.STRING(50),
            allowNull : false,
            unique : true
        },
        //회원 pw
        pw : {
            field : 'pw',
            type : DataTypes.STRING(200),
            allowNull : false
        },
        //회원 name
        Name : {
            field : 'Name',
            type : DataTypes.STRING(50),
            allowNull : false,
            primaryKey : true
        },
        //가입 날짜
        joinDate : {
            field : 'join_date',
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : sequelize.fn('NOW')
        }
    }, {
        tableName : 'member',
        timestamps : false
    });

    Member.findMemberForLogin = (id, pw) => Member.findOne({
        where : {
            id,
            pw
        },
        raw : true,
    });

    Member.findMemberById = (id) => Member.findOne({
        where : {
            id,
        },
        raw : true,
    });

    Member.findMemberByName = (Name) => Member.findOne({
        where : {
            Name,
        },
        raw : true,
    });

    Member.deleteMemberById = (id) => Member.destroy({
        where : {
            id
        },
        raw : true,
    });

    return Member;
}