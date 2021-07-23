const tradeRequestHandler = async(event) => {
    const trashId = event.target.dataset.trashid
    window.location.replace(`/request/${trashId}`)
}

const tradeRequestButtons = document.querySelectorAll(".tradeOfferBtn")
tradeRequestButtons.forEach((button) => {
    button.addEventListener("click", tradeRequestHandler)
})

// SEARCH BAR
$(function() {
    $('#search').on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".userWall").children('.trashCard').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});