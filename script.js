document.querySelectorAll(".tab-link").forEach(tab => {
    tab.addEventListener("click", function() {
        document.querySelectorAll(".tab-link").forEach(t => t.classList.remove("active"));
        this.classList.add("active");

        document.querySelectorAll(".menu-category").forEach(menu => menu.style.display = "none");
        document.getElementById(this.dataset.category).style.display = "block";
    });
});

function toggleDescription(element) {
    document.querySelectorAll(".menu-description").forEach(desc => desc.style.display = "none");
    element.nextElementSibling.style.display = "block";
}
