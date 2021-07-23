const landfillClaimHandler = async(event) => {
    const trashId = event.target.dataset.trashid
    const response = await fetch(`/api/landfill/${trashId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        setTimeout(function() {
            window.location.reload()
        }, 100)
    }
}

const claimButtons = document.querySelectorAll(".claimBtn")
claimButtons.forEach((button) => {
    button.addEventListener("click", landfillClaimHandler)
})

//SEARCH BAR
$(function() {
    $('#search').on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".landfillWall").children('.trashCard').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});