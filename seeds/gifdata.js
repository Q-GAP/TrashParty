let APIKEY = "ur8sKa88o5YJg8iulM0iYStuzZAuOiQC";
const fetch = require('node-fetch');
var randomWords = require('random-words');
const { Trash } = require("../models")

const categories = ["cat", "dog", "car", "house", "man", "woman"]

const fetchGifs = async (search) => {
    await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&rating=pg&q=${search}&limit=50"`)
        .then(res => res.json())
        .then(data => {
            const gifList = data.data.map(gif => {
                return { name: gif.title, image: gif.embed_url }
            });
            gifList.forEach((gif, index) => {
                gif.name = randomWords({
                    exactly: 1, wordsPerString: 2, formatter: (word, index) => {
                        return index === 0 ? word.slice(0, 1).toUpperCase().concat(word.slice(1)) : word;
                    }
                })

                if (index <= 10) {
                    gif.rarity = 1
                }
                else if (index <= 25) {
                    gif.rarity = 2
                }
                else {
                    gif.rarity = 3
                }
            })
            Trash.bulkCreate(gifList);
        })
}

categories.forEach(async (category) => {
    await fetchGifs(category)
})

