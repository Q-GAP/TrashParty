const makeOfferHandler = async (event) => {
    const trashId = event.target.dataset.trashid
    const pathname = window.location.pathname
    const slashIndex = pathname.lastIndexOf('/')
    const givingId = pathname.substring(slashIndex + 1)
    const tradeOffer = {gettingId: trashId, givingId: givingId}
    const response = await fetch(`/api/trade`, {
        method: "POST",
        body: JSON.stringify(tradeOffer),
        headers: { 'Content-Type': 'application/json' }
    })
    if(response.ok) {
        setTimeout(function() {
            window.location.replace("/trades")
        }, 100)
    }
}

const requestButtons = document.querySelectorAll(".makeRequestBtn")
requestButtons.forEach((button) => {
    button.addEventListener("click", makeOfferHandler)
})