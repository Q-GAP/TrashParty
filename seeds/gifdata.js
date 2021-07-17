let APIKEY = "ur8sKa88o5YJg8iulM0iYStuzZAuOiQC";

function fetchData() {
    console.log("START FETCH");
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=25"`).then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data.data);
            const gifList = data.data.map(gif => {

                return { name: gif.title, image: gif.embed_url }

            });
            console.log(gifList);
            document
                .querySelector("#api")
                .insertAdjacentHTML("afterbegin", "<h1>Hi</h1>");
        }).catch(errror => {
            console.log(errror)
        });

}

fetchData();