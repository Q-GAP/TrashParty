M.AutoInit();

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

    const name = $('#nameSignUp').val();
    const github = $('#github').val().trim();
    const username = $('#userNameSignUp').val().trim();
    const email = $('#emailSignUp').val().trim();
    const password = $('#passSignUp').val().trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, github, username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};

$('#submitSignUp').on('click', signupFormHandler);
$('#loginBtn').on('click', loginFormHandler);