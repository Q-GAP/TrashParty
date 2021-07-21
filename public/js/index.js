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
} else {
    $('window').css('background-image', "url('/images/tpbg.gif')")
    $('.window').css('background-size', "cover");
}

$('#logout').on('click', logout);