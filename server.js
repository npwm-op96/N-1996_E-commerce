const express = require("express");
const bodyPasrer = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};
app.options('*', cors()) // include before other routes
app.use(cors(corsOptions));

// app.use(bodyPasrer.json());
app.use(bodyPasrer.json({limit: '2000mb'}));
app.use(bodyPasrer.urlencoded({limit: '2000mb', extended: true}));
// app.use(express.json({limit: '50mb'}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
    next()
  })
app.use(bodyPasrer.urlencoded({ extended: true }));

const db = require("./app/models");
// db.sequelize.sync();

const Role = db.Roles;
// const Member = db.Members;

db.sequelize.sync();
// db.sequelize.sync({ force: true })


// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//     initial();
// });

function initial() {
    Role.create({
      id_user: 1,
      name: "user"
    });
   
    Role.create({
      id_user: 2,
      name: "visitor"
    });
   
    Role.create({
      id_user: 3,
      name: "admin"
    });
}

app.get("/", (req, res) => {
    res.json({ message: "Welcome to N-1996 application." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/member.routes')(app);
require("./app/routes/product.routes")(app);
require("./app/routes/order.routes")(app);



const PORT = process.env.PORT || 8400;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});