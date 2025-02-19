function showCategory(category) {
    document.querySelectorAll('.menu-category').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(category).classList.add('active');
}

function toggleDescription(item) {
    document.querySelectorAll('.description').forEach(desc => {
        desc.style.display = 'none';
    });

    let desc = item.querySelector('.description');
    if (desc) {
        desc.style.display = 'block';
    }
}
