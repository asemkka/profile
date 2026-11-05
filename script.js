const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const themeToggle = document.getElementById("themeToggle");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");


menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});


mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


function toggleTheme() {
  document.body.classList.toggle("dark");
  const darkMode = document.body.classList.contains("dark");
  localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
}
themeToggle.addEventListener("click", toggleTheme);
mobileThemeToggle.addEventListener("click", toggleTheme);
if (localStorage.getItem("portfolio-theme") === "dark") {
  document.body.classList.add("dark");
}


const filterButtons = document.querySelectorAll(".filter");
const workItems = document.querySelectorAll(".work-item");
const emptyState = document.getElementById("emptyState");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.filter;
    let visibleCount = 0;

    workItems.forEach(work => {
      const show = category === "all" || work.dataset.category === category;
      work.hidden = !show;
      if (show) visibleCount++;
    });
    emptyState.hidden = visibleCount !== 0;
  });
});


const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("visitorName").value.trim();
  const email = document.getElementById("visitorEmail").value.trim();
  const message = document.getElementById("visitorMessage").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  document.getElementById("nameError").textContent = name ? "" : "Please enter your name.";
  document.getElementById("emailError").textContent = emailPattern.test(email) ? "" : "Enter a valid email address.";
  document.getElementById("messageError").textContent = message.length >= 10 ? "" : "Message must contain at least 10 characters.";

  if (name && emailPattern.test(email) && message.length >= 10) {
    document.getElementById("formSuccess").textContent = "Thank you! Your message has been checked successfully.";
    contactForm.reset();
  } else {
    document.getElementById("formSuccess").textContent = "";
  }
});