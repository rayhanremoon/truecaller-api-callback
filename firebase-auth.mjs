// Import Firebase Authentication
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOwj9t2G8nEwb2zjNyjlH8qjY899bh0jI",
    authDomain: "rayhan-callback-server.firebaseapp.com",
    projectId: "rayhan-callback-server",
    storageBucket: "rayhan-callback-server.appspot.com",
    messagingSenderId: "733534093075",
    appId: "1:733534093075:web:90eab08e1cf674d1eaa4e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let confirmationResult;

export function sendVerificationCode() {
    const phoneNumber = document.getElementById("phoneNumber").value;
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow sendVerificationCode
        }
    }, auth);

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((result) => {
            confirmationResult = result;
            alert('Verification code sent!');
        }).catch((error) => {
            console.error("Error during verification:", error);
        });
}

export function verifyCode() {
    const code = document.getElementById("verificationCode").value;
    confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        alert('User signed in successfully: ' + user.phoneNumber);
    }).catch((error) => {
        console.error("Error verifying code:", error);
    });
}
