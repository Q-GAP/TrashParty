const landfillAddHandler = async (event) => {
    const trashId = event.target.dataset.trashid
    const response = await fetch(`/api/usertrash/landfill/${trashId}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
    if(response.ok) {
        document.location.reload()
    }

}

const landfillButtons = document.querySelectorAll(".landfillBtn")
landfillButtons.forEach((button) => {
    button.addEventListener("click", landfillAddHandler)
})

