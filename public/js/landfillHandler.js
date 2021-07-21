const landfillClaimHandler = async (event) => {
    const trashId = event.target.dataset.trashid
    const response = await fetch(`/api/landfill/${trashId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' }
    })
    if(response.ok) {
        document.location.reload()
    }

}

const claimButtons = document.querySelectorAll(".claimBtn")
claimButtons.forEach((button) => {
    button.addEventListener("click", landfillClaimHandler)
})