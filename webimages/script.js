// Smooth Scroll Navigation - Active Link Highlight
window.addEventListener('scroll', function() {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('nav ul li a');

    sections.forEach((section, index) => {
        let top = window.scrollY;
        let offset = section.offsetTop - 100;
        let height = section.offsetHeight;

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            navLinks[index].classList.add('active');
        }
    });
});

// Dynamic Add/Remove References
document.getElementById('add-reference').addEventListener('click', function() {
    const referenceSection = document.getElementById('reference-section');
    const newReference = document.createElement('div');
    newReference.classList.add('reference-fields');

    newReference.innerHTML = `
        <label>Name:</label>
        <input type="text" name="reference_name" required>

        <label>Title:</label>
        <input type="text" name="reference_title" required>

        <label>Company:</label>
        <input type="text" name="reference_company" required>

        <label>Phone:</label>
        <input type="tel" name="reference_phone" required>

        <button type="button" class="remove-reference">Remove Reference</button>
    `;

    referenceSection.appendChild(newReference);

    newReference.querySelector('.remove-reference').addEventListener('click', function() {
        referenceSection.removeChild(newReference);
    });
});
