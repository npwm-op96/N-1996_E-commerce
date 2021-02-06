module.exports = app => {
    const member = require("../controllers/member.controller.js");
    var router = require("express").Router();


    router.post("/", member.create);

    router.get("/", member.findAll);

    router.get('/status', member.findAllPublished);

    router.get('/:id', member.findOne);

    router.put('/:id', member.update)

    router.delete('/:id', member.delete);

    router.delete('/', member.deleteAll);

    app.use('/api/member', router);
};