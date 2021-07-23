const tradeRequestHandler = async(event) => {
    const trashId = event.target.dataset.trashid
    window.location.replace(`/request/${trashId}`)
}

const tradeRequestButtons = document.querySelectorAll(".tradeOfferBtn")
tradeRequestButtons.forEach((button) => {
    button.addEventListener("click", tradeRequestHandler)
})