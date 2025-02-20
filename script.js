function openCategory(category) {
    document.querySelectorAll('.menu-category').forEach(item => {
        item.style.display = "none";
    });
    document.getElementById(category).style.display = "block";
}

function toggleDescription(item) {
    let desc = document.querySelector(`#${item} .item-desc`);
    if (desc) {
        let allDescriptions = document.querySelectorAll('.item-desc');
        allDescriptions.forEach(d => d.style.display = "none");
        desc.style.display = desc.style.display === "block" ? "none" : "block";
    }
}
