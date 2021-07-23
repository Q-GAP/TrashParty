const tradeAccept = async(event) => {
    const tradeId = event.target.dataset.tradeid
    const response = await fetch(`/api/trade/accept/${tradeId}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
    if(response.ok) {
        setTimeout(function() {
            window.location.reload()
        }, 100)
    }
}

const tradeDeny = async(event) => {
    const tradeId = event.target.dataset.tradeid
    const response = await fetch(`/api/trade/${tradeId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    })
    if(response.ok) {
        setTimeout(function() {
            window.location.reload()
        }, 100)
    }
}

const acceptButtons = document.querySelectorAll(".acceptBtn")
acceptButtons.forEach((button) => {
    button.addEventListener("click", tradeAccept)
})

const denyButtons = document.querySelectorAll(".denyBtn")
denyButtons.forEach((button) => {
    button.addEventListener("click", tradeDeny)
})