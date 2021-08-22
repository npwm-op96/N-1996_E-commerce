// const { sequelize } = require("../models");
const db = require("../models");
const Order = db.Orders;
const Order_detail = db.Order_details;
const Product = db.Products;
const Member = db.Members;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    var now = new Date();
    var date = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate()
    console.log(date)
    const order = {
        id_user: req.body.id_user,
        total: req.body.total,
        date_buy: date
    };
    console.log(order)

    const order_detail = req.body.order
    console.log(order_detail)
    Order.create(order)
        .then(data => {
            // console.log(data)
            id_order = data.dataValues.id_order
            console.log(id_order)
            order_detail.forEach(product => {
                Product.findAll({
                    where: { id_product: product.id_product }
                })
                    .then(data => {
                        console.log(data[0].dataValues)
                        const order = {
                            id_order: id_order,
                            id_product: product.id_product,
                            price:data[0].dataValues.price,
                            qty:product.qty,
                            date_buy:date
                        };
                        console.log(order)
                        Order_detail.create(order)
                        sum_product = data[0].dataValues.qty
                        console.log(sum_product)
                        Product.update({
                            qty: sum_product - product.qty
                        }, {
                            where: { id_product: product.id_product }
                        })
                    })
            })
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product "
            });
        });
};


exports.findAll =  (req, res) => {
    var auth_id = req.id_user
    Order.findAll({
        where:{id_user:auth_id},
        include: Order_detail            
    })
        .then(data => {
            // Order_detail.findByPk()
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error product"
            });
        });
};
exports.Order_detail = (req, res) => {
    console.log(res)
    const id = req.params.id;
    console.log(id)
    Order_detail.findAll({
        where: { id_order: id },
        include:Product
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retriving Order"
            });
        });
};
exports.findOne = (req, res) => {
    // console.log(res)
    const id = req.params.id;

    Order.findByPk(id,{
        include: Order_detail

    }
        )
        .then(data => {
    console.log(data)

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retriving Order"
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Order.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Order was update successfully"
                });
            } else {
                res.send({
                    message: `Cannot update Order with=${id}.Maybe Order was not dound or req.body is empty`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Order with id =" + id
            });
        });
};

exports.delete = (req, res) => {
const id_order = req.params.id;
console.log(id_order)
Order_detail.destroy({
    where:{id_order:id_order}
})

    Order.destroy({
        where: { id_order: id_order }
    })
        .then(num => {
            console.log(num)
            if (num == 1) {
                res.send({
                    message: "Order was delelet successfully"
                });

            } else {
                res.send({
                    message: `Cannot delete Order with id =${id_order}.Maybe Product was not found`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Order with id=" + id_order
            });
        });
};

exports.deleteAll = (req, res) => {
    Order.destroy({
        where: {},
        truncate: false
    })
        .then(num => {
            res.send({ message: `${num} Products were deleed successfully` })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all "
            });
        });
};
exports.findAllPublished = (req, res) => {
    Product.findAll({ where: { id_cat: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occourd while retriving order"
            });
        });
};