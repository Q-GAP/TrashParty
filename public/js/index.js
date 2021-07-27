console.log('index.js attached')
M.AutoInit();

$(function() {
    $.ajax({
        url: '/api/users',
        method: 'GET',

    }).then((response) => {
        let userList = $('.userList');
        response.map((user) => {
            userList.append(`<a href='/user/${user.id}'><div class="userListCard card">${user.username}</div></a>`);

        })
        console.log('USERLIST', userList)
    })
})

const logout = async() => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        console.log('\n\nresponse: ' + response + '\n\n')
        alert('Failed to log out.');
    }
};

if (document.location.pathname === "/collection" || document.location.pathname === "/landfill" || document.location.pathname === "/collection/" || document.location.pathname === "/landfill/") {
    $('.window').css('background-image', "url('/images/landfillwallpaper.jpeg')");
    $('.window').css('background-size', "unset");
    $('#stopGIF').hide();
    $('#startGIF').hide();
} else {
    $('window').css('background-image', "url('/images/tpbg.gif')")
    $('.window').css('background-size', "cover");
    $('#stopGIF').show();
}

$('#stopGIF').on('click', () => {
    $('.window').css('background-image', 'unset')
    $('#stopGIF').hide();
    $('#startGIF').show();
})

$('#startGIF').on('click', () => {
    $('.window').css('background-image', "url('https://bafybeiebr2pz4p3itoh7skbdjpzaifrqdujzl2bsibfsi5j3wsra7m7pfq.ipfs.dweb.link/')")
    $('#startGIF').hide();
    $('#stopGIF').show();
})

$('.logout').on('click', logout);
$('#openAside').on('click', () => {
    // $('#closeAside').show();
    $('#openAside').hide();
    $('.window').children().hide();
    $('aside').show();
})

$('#closeAside').on('click', () => {
    $('aside').hide();
    $('.window').children().show();
    $('#openAside').show();
})

// $('aside').on('click', () => {
//     $('aside').hide();
//     $('#openAside').show();
// })

//SEARCH BAR
$(function() {
    $('#search').on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $(".userList").children().children('.userListCard').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});