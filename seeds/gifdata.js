let APIKEY = "ur8sKa88o5YJg8iulM0iYStuzZAuOiQC";
const fetch = require('node-fetch');
var randomWords = require('random-words');
const { Trash } = require("../models")

const categories = ["Cat", "Dog", "Car", "House", "Superhero", "Ghost"]

const fetchGifs = async (search) => {

    await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&rating=pg&q=${search}&limit=50"`)
        .then(res => res.json())
        .then(data => {
            const gifList = data.data.map(gif => {
                return { image: gif.embed_url }
            });
            gifList.forEach((gif, index) => {
                gif.category = search
                if (index <= 10) {
                    gif.rarity = 1
                    gif.name = randomWords({
                        exactly: 1, wordsPerString: 1, formatter: (word, index) => {
                            return index === 0 ? word.slice(0, 1).toUpperCase().concat(word.slice(1)) : word;
                        }
                    })
                }
                else if (index <= 25) {
                    gif.rarity = 2
                    gif.name = randomWords({
                        exactly: 1, wordsPerString: 2, formatter: (word, index) => {
                            return index === 0 ? word.slice(0, 1).toUpperCase().concat(word.slice(1)) : word;
                        }
                    })
                }
                else {
                    gif.rarity = 3
                    gif.name = randomWords({
                        exactly: 1, wordsPerString: 3, formatter: (word, index) => {
                            return index === 0 ? word.slice(0, 1).toUpperCase().concat(word.slice(1)) : word;
                        }
                    })
                }
            })
            Trash.bulkCreate(gifList);
        })
}

const seedAllGifs = async () => {
    categories.forEach(async (category) => {
        await fetchGifs(category)
    })
}

module.exports = seedAllGifs;


