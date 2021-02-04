module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "N-1996_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};