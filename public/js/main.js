(() => {
  'use strict';
  
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });
})();

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk5Dh3Z-Fwdg48Hr1L1EuTutpTtI2Sbm8",
  authDomain: "job-finder-ab7eb.firebaseapp.com",
  projectId: "job-finder-ab7eb",
  storageBucket: "job-finder-ab7eb.appspot.com",
  messagingSenderId: "940586698788",
  appId: "1:940586698788:web:4c10f782092958d8f5b0b1",
  measurementId: "G-T00429KYYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
auth.languageCode = 'en'; // Set language for Google OAuth
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);

      // The signed-in user info.
      const user = result.user;
      console.log(user);

      // Redirect to another page after successful login
      window.location.href = "../";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error ${errorCode}: ${errorMessage}`);
    });
});