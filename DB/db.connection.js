const mysql = require("mysql");
require("dotenv").config();

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        this.connect();
    }

    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error("Error connecting to the database: ", err);
                return;
            }
            console.log("Connected to the database...................!");
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = new Database();
