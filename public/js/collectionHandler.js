console.log('Welcome to Your Collection');
const landfillAddHandler = async(event) => {
    const trashId = event.target.dataset.trashid
    const response = await fetch(`/api/landfill/${trashId}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        setTimeout(() => {
            window.location.reload()
        }, 250)

    }
}
const landfillButtons = document.querySelectorAll(".landfillBtn")
landfillButtons.forEach((button) => {
    button.addEventListener("click", landfillAddHandler)
})