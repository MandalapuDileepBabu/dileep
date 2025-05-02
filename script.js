function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user exists and password matches
    const user = users.find(u => u.email === email && u.password === password);

    if (user || (email === "admin@example.com" && password === "admin123")) {
        window.location.href = "main.html";
    } else {
        alert("Invalid email or password.");
    }
}

function forgotPassword() {
    const email = prompt("Enter your registered email address:");
    if (!email) return;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
        alert("Your password is: " + user.password);
    } else if (email.toLowerCase() === "admin@example.com") {
        alert("Admin password is: admin123");
    } else {
        alert("No account found with this email.");
    }
}

// ...rest of your code...

function logout() {
    // Optionally clear session data here
    window.location.href = "login.html";
}
function saveFeedback(event) {
    event.preventDefault();
    const feedback = {
        service: document.getElementById('service').value,
        rating: document.getElementById('rating').value,
        comment: document.getElementById('comment').value,
        location: document.getElementById('location').value
    };

    // Get existing feedbacks or initialize empty array
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    alert('Feedback submitted!');
    event.target.reset();
}
function showFeedbacks() {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    const container = document.getElementById('feedback-list');
    container.innerHTML = '';
    feedbacks.forEach(fb => {
        const div = document.createElement('div');
        div.textContent = `${fb.service} - Rating: ${fb.rating} - ${fb.comment} (${fb.location})`;
        container.appendChild(div);
    });
}
function handleSignup(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Get existing users or initialize empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    if (users.find(u => u.email === email)) {
        alert('Account already exists with this email.');
        return;
    }

    // Add new user
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created! You can now log in.');
    closeSignup();
}
function openSignup() {
    document.getElementById('signupForm').style.display = 'block';
}
function closeSignup() {
    const form = document.getElementById('signupForm');
    if (form) form.style.display = 'none';
}



// Function to load countries dynamically
async function loadCountries() {
  const response = await fetch("full_countries.json");
  const countries = await response.json();
  const countrySelect = document.getElementById("country");

  // Populate the dropdown
  countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country.code;
    option.text = country.name;
    option.setAttribute("data-code", country.dial_code);
    countrySelect.appendChild(option);
  });
}

// Function to filter countries based on user input
function filterCountries() {
  const filter = document.getElementById("countrySearch").value.toUpperCase();
  const countrySelect = document.getElementById("country");
  const options = countrySelect.getElementsByTagName("option");

  for (let i = 1; i < options.length; i++) { // Start from 1 to skip the default "Select Country" option
    const countryName = options[i].textContent || options[i].innerText;
    if (countryName.toUpperCase().indexOf(filter) > -1) {
      options[i].style.display = "";
    } else {
      options[i].style.display = "none";
    }
  }
}

// Update mobile placeholder based on selected country dial code
function updateMobilePlaceholder() {
  const select = document.getElementById("country");
  const selectedOption = select.options[select.selectedIndex];
  const dialCode = selectedOption.getAttribute("data-code") || "";
  document.getElementById("mobile").placeholder = `e.g. ${dialCode} 1234567890`;
}

// Load countries when page loads
window.onload = () => {
  loadCountries();
};
