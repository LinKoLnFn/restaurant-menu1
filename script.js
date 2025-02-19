document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".menu-link");
    const sections = document.querySelectorAll(".menu-section");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const category = this.getAttribute("data-category");

            sections.forEach(section => {
                if (section.id === category) {
                    section.classList.add("active");
                } else {
                    section.classList.remove("active");
                }
            });
        });
    });
});

function toggleDescription(element) {
    const allDescriptions = document.querySelectorAll(".menu-description");
    
    allDescriptions.forEach(desc => {
        if (desc.previousElementSibling !== element) {
            desc.style.display = "none";
        }
    });

    const description = element.nextElementSibling;
    if (description) {
        description.style.display = description.style.display === "block" ? "none" : "block";
    }
}
