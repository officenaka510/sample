/*
 * 公開前に、次の2項目を正式な内容へ差し替えてください。
 * 例:
 * const PHONE_NUMBER = "0742-00-0000";
 * const LINE_URL = "https://line.me/R/ti/p/@xxxxxxxx";
 */
const PHONE_NUMBER = "";
const LINE_URL = "";

const digitsOnly = (value) => value.replace(/[^\d+]/g, "");
const phoneLinks = document.querySelectorAll(".js-phone-link");
const lineLinks = document.querySelectorAll(".js-line-link");
const phoneTexts = document.querySelectorAll(".js-phone-text");
const dialog = document.querySelector(".placeholder-dialog");
const dialogClose = document.querySelector(".dialog-close");
const menuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuBackdrop = document.querySelector(".mobile-menu-backdrop");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu nav a");

if (PHONE_NUMBER) {
  phoneLinks.forEach((link) => {
    link.href = `tel:${digitsOnly(PHONE_NUMBER)}`;
  });
  phoneTexts.forEach((text) => {
    text.textContent = PHONE_NUMBER;
  });
}

if (LINE_URL) {
  lineLinks.forEach((link) => {
    link.href = LINE_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function showPlaceholderDialog(event) {
  event.preventDefault();
  dialog.hidden = false;
  document.body.classList.add("dialog-open");
  dialogClose.focus();
}

if (!PHONE_NUMBER) {
  phoneLinks.forEach((link) => link.addEventListener("click", showPlaceholderDialog));
}

if (!LINE_URL) {
  lineLinks.forEach((link) => link.addEventListener("click", showPlaceholderDialog));
}

function closeDialog() {
  dialog.hidden = true;
  document.body.classList.remove("dialog-open");
}

dialogClose.addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !dialog.hidden) closeDialog();
});

function openMenu() {
  mobileMenu.hidden = false;
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "メニューを閉じる");
  document.body.classList.add("menu-open");
}

function closeMenu({ restoreFocus = false } = {}) {
  mobileMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "メニューを開く");
  document.body.classList.remove("menu-open");
  if (restoreFocus) menuToggle.focus();
}

menuToggle.addEventListener("click", () => {
  if (mobileMenu.hidden) {
    openMenu();
  } else {
    closeMenu();
  }
});

menuBackdrop.addEventListener("click", () => closeMenu());
mobileMenuLinks.forEach((link) => link.addEventListener("click", () => closeMenu()));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileMenu.hidden) {
    closeMenu({ restoreFocus: true });
  }
});

window.addEventListener(
  "resize",
  () => {
    if (window.innerWidth > 980 && !mobileMenu.hidden) closeMenu();
  },
  { passive: true },
);

const gallery = document.querySelector(".clinic-gallery");
const cards = [...gallery.querySelectorAll(".gallery-card")];
const dots = [...document.querySelectorAll(".gallery-dots button")];
const previousButton = document.querySelector(".gallery-arrow.prev");
const nextButton = document.querySelector(".gallery-arrow.next");

function cardStep() {
  if (!cards.length) return 0;
  const galleryGap = Number.parseFloat(getComputedStyle(gallery).gap) || 0;
  return cards[0].getBoundingClientRect().width + galleryGap;
}

function activeIndex() {
  const step = cardStep();
  if (!step) return 0;
  return Math.max(0, Math.min(cards.length - 1, Math.round(gallery.scrollLeft / step)));
}

function updateDots() {
  const current = activeIndex();
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === current);
    dot.setAttribute("aria-current", index === current ? "true" : "false");
  });
}

function goToCard(index) {
  gallery.scrollTo({
    left: cardStep() * Math.max(0, Math.min(cards.length - 1, index)),
    behavior: "smooth",
  });
}

previousButton.addEventListener("click", () => goToCard(activeIndex() - 1));
nextButton.addEventListener("click", () => goToCard(activeIndex() + 1));
dots.forEach((dot, index) => dot.addEventListener("click", () => goToCard(index)));
gallery.addEventListener("scroll", updateDots, { passive: true });
gallery.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goToCard(activeIndex() - 1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    goToCard(activeIndex() + 1);
  }
});

window.addEventListener("resize", updateDots, { passive: true });
updateDots();
