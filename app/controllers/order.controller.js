const db = require("../models");
const Order = db.Orders;
const Product = db.Products;
const Member = db.Members;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.id_member) {
        res.status(400).send({
            message: "(Content can not be empty)"
        });
        return;
    }
    // var pro_obj = []

    const order = {
        id_member: req.body.id_member,
        id_pro: req.body.id_pro,
        qty: req.body.qty,
    };
    var id_pro = req.body.id_pro
    var qty_order = req.body.qty
    const pro_obj = Product.findAll({
            where: {
                id: {
                    [Op.eq]: id_pro
                }
            },
            attributes: ['qty']
        })
        // .then(data => {
    res.send(pro_obj);
    // var sum = data[0].qty - qty_order

    // Product.update({ qty: sum }, {
    //     where: { id: id_pro }
    // })
    // Order.create(order)
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while creating the product "
    //         });
    //     });

    // })
    // res.send(product_sum);


};

exports.findAll = (req, res) => {
    const id_member = req.query.id_member;
    // var condition = name ? {
    //     id_member: {
    //         [Op.like]: `%${id_member}`
    //     }
    // } : null;
    // ["member"]},{include:["product"]
    // product
    Order.findAll({ include:['product','member']})
    // Order.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error product"
            });
        });
};

// exports.findAll = (req, res) => {
//     const id 

// };

exports.findOne = (req, res) => {
    const id = req.params.id;

    Order.findByPk(id, { include: ["member"] })
        .then(data => {
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
    const id = req.params.id;

    Order.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was delelet successfully"
                });

            } else {
                res.send({
                    message: `Cannot delete Product with id =${id}.Maybe Product was not found`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
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