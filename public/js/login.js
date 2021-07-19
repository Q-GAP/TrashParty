$('.sidenav-trigger').on('click', () => {
    $('.login-signup').children().toggle();
})


$(window).on('click', (e) => {
    let ignore = document.querySelector('.sn')
    if (e.target == ignore.firstChild || e.target == document.querySelector('i')) {
        console.log(e.target)
    } else {
        document.querySelector('.sidenav-overlay').click();
        $('.login-signup').children().show();
    }

})

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

        if (response.ok) {
            console.log('Succesfully logged in as ' + email)
            document.location.replace('/');
        } else {
            alert('Failed to log in.', err);
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

        if (response.ok) {
            console.log('Successfully signed up as ' + username)
            document.location.redirect('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};

$('#submitSignUp').on('click', signupFormHandler);
$('#loginBtn').on('click', loginFormHandler);