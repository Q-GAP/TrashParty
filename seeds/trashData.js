const { Trash } = require('../models')

const trashData = [
    {
        name: "Test Trash #1",
        image: "https://giphy.com/embed/3o7527pa7qs9kCG78A",
        rarity: 5
    },
    {
        name: "Test Trash #2",
        image: "https://giphy.com/embed/4Zo41lhzKt6iZ8xff9",
        rarity: 4
    },
    {
        name: "Test Trash #3",
        image: "https://giphy.com/embed/WLbtNNR5TKJBS",
        rarity: 3
    },
    {
        name: "Test Trash #4",
        image: "https://giphy.com/embed/xThtadSLoInlcD1UmA",
        rarity: 2
    },
    {
        name: "Test Trash #5",
        image: "https://giphy.com/embed/QvBoMEcQ7DQXK",
        rarity: 1
    }
]

const seedTrash = () => Trash.bulkCreate(trashData);

module.exports = seedTrash;