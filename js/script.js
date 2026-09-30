/* =====================================================================
   Senghakheng — Portfolio scripts
   Small, independent features:
     1. Mobile navigation
     2. Active nav link while scrolling
     3. Light/dark theme toggle
     4. Project detail modals
     5. Screenshot lightbox
     6. LinkedIn placeholder handling
     7. Fade-in on scroll
   ===================================================================== */

document.documentElement.classList.add("js");


/* ---------- 1. Mobile navigation ---------- */

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");

function setMenuOpen(isOpen) {
  navMenu.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

navToggle.addEventListener("click", () => {
  setMenuOpen(!navMenu.classList.contains("open"));
});

// Close the menu after choosing a link
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

// Close the menu with Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu.classList.contains("open")) {
    setMenuOpen(false);
    navToggle.focus();
  }
});


/* ---------- 2. Active nav link while scrolling ---------- */

const navLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" }); // a section is "active" when it crosses the middle of the screen

  document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
}


/* ---------- 3. Light/dark theme toggle ---------- */

const themeToggle = document.querySelector(".theme-toggle");

function updateThemeButton() {
  const isDark = document.documentElement.getAttribute("data-theme") !== "light";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
}

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    // Storage can be blocked (e.g. private browsing); the toggle still works for this visit.
  }
  updateThemeButton();
});

updateThemeButton();


/* ---------- 4. Project detail modals ---------- */
// Uses the native <dialog> element: it traps focus and closes on Escape by itself.

// Remembers which button opened each dialog, so focus can return to it on close
const dialogOpeners = new WeakMap();

function openDialog(dialog) {
  dialogOpeners.set(dialog, document.activeElement);
  dialog.showModal();
  document.body.classList.add("modal-open");
}

// Buttons with data-open-dialog="some-id" open that dialog
document.querySelectorAll("[data-open-dialog]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.getElementById(button.dataset.openDialog);
    if (dialog) openDialog(dialog);
  });
});

document.querySelectorAll("dialog").forEach((dialog) => {
  // Close buttons
  dialog.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });

  // Clicking the dark backdrop (outside the dialog box) closes it
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Runs for every way of closing (button, Escape, backdrop)
  dialog.addEventListener("close", () => {
    dialog.querySelectorAll("video").forEach((video) => video.pause());

    // Only unlock page scrolling when no other dialog is still open
    if (!document.querySelector("dialog[open]")) {
      document.body.classList.remove("modal-open");
    }
    const opener = dialogOpeners.get(dialog);
    if (opener && document.contains(opener)) opener.focus();
  });
});


/* ---------- 5. Screenshot lightbox ---------- */

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.dataset.lightboxAlt || "";
    openDialog(lightbox);
  });
});


/* ---------- 6. LinkedIn placeholder handling ---------- */
// Until LINKEDIN_URL_HERE is replaced in index.html, LinkedIn links are shown as disabled.

document.querySelectorAll("a[data-linkedin]").forEach((link) => {
  if (link.getAttribute("href") !== "LINKEDIN_URL_HERE") return;
  link.classList.add("is-placeholder");
  link.setAttribute("aria-disabled", "true");
  link.setAttribute("title", "LinkedIn link coming soon");
  link.addEventListener("click", (event) => event.preventDefault());
});


/* ---------- 7. Fade-in on scroll ---------- */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
