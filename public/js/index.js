console.log('index.js attached')
M.AutoInit();

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

$('#logout').on('click', logout);