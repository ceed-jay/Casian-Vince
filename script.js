// Classic Elegant wedding site - script.js (Real-time RSVP submission)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvpForm');
  const submitBtn = document.getElementById('submitRsvp');
  const status = document.getElementById('rsvpStatus');
  const clearBtn = document.getElementById('clearStorage');

  // Replace with your Formspree endpoint ↓
  const FORMSPREE_URL = "https://formspree.io/f/manpaeeo";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    status.textContent = "Sending your Reservation please wait...";

    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.textContent = "Thank you! Your Reservation has been sent successfully.";
        status.style.color = "green";
        form.reset();
      } else {
        status.textContent = "Oops! Something went wrong. Please try again later.";
        status.style.color = "crimson";
      }
    } catch (error) {
      status.textContent = "Network error. Please check your connection and try again.";
      status.style.color = "crimson";
    }

    submitBtn.disabled = false;
  });

  // Optional: Clear button (just clears the form visually)
  clearBtn.addEventListener('click', () => {
    form.reset();
    status.textContent = '';
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
