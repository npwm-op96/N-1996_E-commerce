const db = require("../models");
const Member = db.Members;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.username) {
        res.status(400).send({
            message: "(Content can not be empty)"
        });
        return;
    }

    const member = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        status: req.body.status,
        email: req.body.email,
        no: req.body.no,
        bd: req.body.bd,

    };

    Member.create(member)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the member "
            });
        });
};

exports.findAll = (req, res) => {
    // const name = req.query.name;
    // var condition = name ? {
    //     name: {
    //         [Op.like]: `%${name}`
    //     }
    // } : null;

    // Member.findAll({ where: condition })
    Member.findAll({ include: ["order"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error member"
            });
        });
};

// exports.findAll = (req, res) => {
//     const id 

// };

exports.findOne = (req, res) => {
    const id = req.params.id;

    Member.findByPk(id)
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

    Member.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was update successfully"
                });
            } else {
                res.send({
                    message: `Caonot update Product with=${id}.Maybe Product was not dound or req.body is empty`
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

    Member.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Member was delelet successfully"
                });

            } else {
                res.send({
                    message: `Cannot delete Member with id =${id}.Maybe Product was not found`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Member with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Member.destroy({
            where: {},
            truncate: false
        })
        .then(num => {
            res.send({ message: `${num} Members were deleed successfully` })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all "
            });
        });
};
exports.findAllPublished = (req, res) => {
    Member.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occourd while retriving member"
            });
        });
};