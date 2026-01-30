// image33.js
const grid = document.getElementById('image-grid');
const fullImg = document.getElementById('full-img');
const lightbox = document.getElementById('lightbox');

// Manually curated IDs for 15 images per category
const curatedData = [
    { category: 'nature', ids: [10, 11, 15, 16, 17, 18, 19, 28, 35, 37, 48, 54, 101, 116, 118] },
    { category: 'city', ids: [103, 110, 111, 122, 146, 164, 168, 169, 170, 171, 175, 180, 183, 184, 187] },
    { category: 'tech', ids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 26, 36, 42, 60] },
    { category: 'people', ids: [22, 32, 64, 65, 91, 129, 177, 204, 212, 338, 342, 443, 453, 473, 476] }
];

let allImages = [];
let currentFiltered = [];
let currentIndex = 0;

// Process the curated data into a flat list
curatedData.forEach(group => {
    group.ids.forEach(id => {
        allImages.push({
            category: group.category,
            thumb: `https://picsum.photos/id/${id}/400/300`,
            full: `https://picsum.photos/id/${id}/1200/800`
        });
    });
});

function render(data) {
    currentFiltered = data;
    grid.innerHTML = data.map((img, index) => `
        <div class="img-card" data-category="${img.category}" onclick="openLightbox(${index})">
            <img src="${img.thumb}" alt="${img.category}" loading="lazy">
            <div class="overlay"><span>${img.category.toUpperCase()}</span></div>
        </div>
    `).join('');
}

function filterImg(category) {
    // Update button UI
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const filtered = (category === 'all') ? allImages : allImages.filter(i => i.category === category);
    render(filtered);
}

function openLightbox(index) {
    currentIndex = index;
    fullImg.src = currentFiltered[currentIndex].full;
    lightbox.style.display = 'flex';
}

function closeLightbox() { lightbox.style.display = 'none'; }

function changeImage(step) {
    currentIndex = (currentIndex + step + currentFiltered.length) % currentFiltered.length;
    fullImg.src = currentFiltered[currentIndex].full;
}

// Initial Run
render(allImages);