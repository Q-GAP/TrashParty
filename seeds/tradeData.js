const { Trade } = require('../models')

const tradeData = [
    {
        getterId: 1,
        giverId: 2,
        givingId: 4,
        gettingId: 2
    },
]

const seedTrades = () => Trade.bulkCreate(tradeData);

module.exports = seedTrades;