const db = require("../models");
const Product = db.Products;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.name) {
        res.status(400).send({
            message: "(Content can not be empty)"
        });
        return;
    }

    const product = {
        name: req.body.name,
        qty: req.body.qty,
        id_cat: req.body.id_cat,
        price:req.body.price
    };

    Product.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product "
            });
        });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {
        name: {
            [Op.like]: `%${name}`
        }
    } : null;

    Product.findAll({ where: condition })
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

    Product.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retriving Product"
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Product.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was update successfully"
                });
            } else {
                res.send({
                    message: `Cannot update Product with=${id}.Maybe Product was not dound or req.body is empty`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id =" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Product.destroy({
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
    Product.destroy({
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
exports.findAllproduct = (req, res) => {
    Product.findAll({ where: { id_cat: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occourd while retriving product"
            });
        });
};