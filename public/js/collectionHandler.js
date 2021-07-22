const landfillAddHandler = async(event) => {
    const trashId = event.target.dataset.trashid
    const response = await fetch(`/api/landfill/${trashId}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
    if(response.ok) {
        setTimeout(function() {
            window.location.reload()
        }, 100)
    }
}
const landfillButtons = document.querySelectorAll(".landfillBtn")
landfillButtons.forEach((button) => {
    button.addEventListener("click", landfillAddHandler)
})