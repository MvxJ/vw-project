const backToTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        backToTop.classList.add("active");
    } else {
        backToTop.classList.remove("active");
    }
});