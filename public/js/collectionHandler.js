const landfillAddHandler = async (event) => {
    const trashId = event.target.dataset.trashid
    const response = await fetch(`/api/usertrash/landfill/${trashId}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
    if(response.ok) {
        document.location.reload()
    }

<<<<<<< HEAD
=======
}

const landfillButtons = document.querySelectorAll(".landfillBtn")
landfillButtons.forEach((button) => {
    button.addEventListener("click", landfillAddHandler)
})

>>>>>>> a864258d21bc6766713bb2026f815927042abd19
$(window).onload = function() {
    $('.window').css('background-image', "url('../images/landfillwallpaper.jpg')");
}