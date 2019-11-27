//  MOBILE NAVIGATION
const mobNavBtn = document.getElementById("mobNavBtn");
const toggleMobileNav = document.querySelector(".main_nav");

function initHeaderNavigation() {
  if (mobNavBtn) {
    mobNavBtn.addEventListener("click", function() {
      toggleMobileNav.classList.toggle("in");
      mobNavBtn.childNodes[1].classList.toggle("active");

      document.addEventListener("click", function(event) {
        if (!event.target.closest(".main_nav") && !event.target.closest(".nav_button")) {
          toggleMobileNav.classList.remove("in");

          mobNavBtn.childNodes[1].classList.remove("active");
        }
      });
    });
  }
}

export { initHeaderNavigation };
