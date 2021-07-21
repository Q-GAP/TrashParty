const { Trash } = require('../models')

const trashData = [
    {
        name: "Test Trash #1",
        image: "https://media4.giphy.com/media/WYEWpk4lRPDq0/200.gif?cid=c367375du9p9czh2cp9p5o0340dlj402cwhdq2ux60fljt87&rid=200.gif&ct=g",
        rarity: 3,
        category: "Cat"
    },
    {
        name: "Test Trash #2",
        image: "https://media3.giphy.com/media/13CoXDiaCcCoyk/200.gif?cid=c367375du9p9czh2cp9p5o0340dlj402cwhdq2ux60fljt87&rid=200.gif&ct=g",
        rarity: 1,
        category: "Cat"
    },
    {
        name: "Test Trash #3",
        image: "https://media2.giphy.com/media/ToMjGppLes0ENI5osCc/200.gif?cid=c367375du9p9czh2cp9p5o0340dlj402cwhdq2ux60fljt87&rid=200.gif&ct=g",
        rarity: 3,
        category: "Cat"
    },
    {
        name: "Test Trash #4",
        image: "https://media1.giphy.com/media/cuPm4p4pClZVC/200.gif?cid=c367375du9p9czh2cp9p5o0340dlj402cwhdq2ux60fljt87&rid=200.gif&ct=g",
        rarity: 2,
        category: "Cat"
    },
    {
        name: "Test Trash #5",
        image: "https://media0.giphy.com/media/H2GT0TQBAlbuo/200.gif?cid=c367375du9p9czh2cp9p5o0340dlj402cwhdq2ux60fljt87&rid=200.gif&ct=g",
        rarity: 1,
        category: "Cat"
    }
]

const seedTrash = () => Trash.bulkCreate(trashData);

module.exports = seedTrash;