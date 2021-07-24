// Sidebar to play nice with handlebars.
$('.sidenav-trigger').on('click', () => {
    $('.login-signup').children().hide();
})


$(window).on('click', (e) => {
    let ignore = document.querySelector('.sn')
    if (e.target == ignore.firstChild || e.target == document.querySelector('i')) {
        return;
    } else {
        document.querySelector('.sidenav-overlay').click();
        $('.login-signup').children().show();
    }

})


// Start Real Code.

// Login
const loginFormHandler = async(event) => {
    event.preventDefault();

    const email = $('#emailLogin').val().trim();
    const password = $('#passwordLogin').val().trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response)
        if (response.ok) {
            console.log('Succesfully logged in as ' + email)
            document.location.replace('/');
        } else {
            alert('Failed to log in. \n STATUS: ' + response.status + '\n STATUS TEXT:' + response.statusText + '\n \n Make sure to check your credentials \n -or- \n Remember to signup below. \n');
            document.location.reload();
        }
    }
};

// Sign up
const signupFormHandler = async(event) => {
    event.preventDefault();
    console.log('SignUp Handler Fired')


    const username = $('#userNameSignUp').val().trim();
    const email = $('#emailSignUp').val().trim();
    const password = $('#passSignUp').val().trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            console.log('Successfully signed up as ' + username)
            document.location.replace('/');
        } else {
            alert("So that didn't go as planned" + '\n STATUS: ' + response.status + '\n STATUS TEXT:' + response.statusText + '\n \n Make sure to check your credentials \n -or- \n Remember to signup below. \n');
            document.location.reload();
        }
    }
};

//Declare elements as variables to separate login from signup event listeners
let signInput = $('.signup-input');
let loginInput = $('.login-input');
let selectedSignup = false;
let selectedLogin = false;

// If signup inputs aren't empty, listen for enter key to submit form
function signupCheck() {
    if (signInput) {
        selectedSignup = true
    } else {
        selectedSignup = false
    }

    if (selectedSignup) {
        $(signInput).on('keypress', (e) => {
            if (e.key == 'Enter') {
                $('#signupBtn').trigger('click')
                signInput.val() = ''
            }
        })
    }
}

// If login inputs aren't empty, listen for enter key to submit form
function loginCheck() {
    if (loginInput) {
        selectedLogin = true
    } else {
        selectedLogin = false
    }

    if (selectedLogin) {
        $(loginInput).on('keypress', (e) => {
            if (e.key == 'Enter') {
                $('#loginBtn').trigger('click')
                $('#loginForm').trigger('reset')
            }
        })
    }
}





$('#signupBtn').on('click', signupFormHandler);
signInput.on('keyup', signupCheck);

$('#loginBtn').on('click', loginFormHandler);
loginInput.on('keyup', loginCheck);