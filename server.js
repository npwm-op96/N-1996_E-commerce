const express = require("express");
const bodyPasrer = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use(bodyPasrer.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
    next()
  })

app.use(bodyPasrer.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.Roles;
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//     initial();
// });

function initial(){
    Role.create({
        id:1,
        name:"user"
    });
    Role.create({
        id:2,
        name:"moderator"
    });
    Role.create({
        id:3,
        name:"admin"
    });
}

// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to N-1996 application." });
// });

require("./app/routes/product.routes")(app);
require("./app/routes/member.routes")(app);
require("./app/routes/order.routes")(app);



const PORT = process.env.PORT || 8400;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}.');
});