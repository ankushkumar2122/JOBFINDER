(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const darkModeIcon = document.getElementById("darkModeIcon");
    const body = document.body;

    // Check localStorage for user's theme preference
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        darkModeIcon.classList.replace("fa-moon", "fa-sun");
    }

    // Toggle dark mode and icon on button click
    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            darkModeIcon.classList.replace("fa-moon", "fa-sun");
        } else {
            localStorage.setItem("theme", "light");
            darkModeIcon.classList.replace("fa-sun", "fa-moon");
        }
    });
});
