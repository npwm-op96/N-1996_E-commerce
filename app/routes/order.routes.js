module.exports = app => {
    const order = require("../controllers/order.controller.js");
    var router = require("express").Router();


    router.post("/", order.create);

    router.get("/", order.findAll);

    router.get('/status', order.findAllPublished);

    router.get('/:id', order.findOne);

    router.get('/order_detail/:id', order.Order_detail);
    
    router.put('/:id', order.update)

    router.delete('/:id', order.delete);

    router.delete('/', order.deleteAll);

    app.use('/api/order', router);
};