const galleryImages = Array.from(
    document.querySelectorAll(".gallery-item img")
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentIndex = 0;


function showImage(index) {

    currentIndex =
        (index + galleryImages.length) % galleryImages.length;

    const image = galleryImages[currentIndex];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxCaption.textContent =
        image.dataset.caption || image.alt;
}


function openLightbox(index) {

    showImage(index);

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}


/*
 * Open the lightbox when a gallery image is clicked.
 */
galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {
        openLightbox(index);
    });

});


/*
 * Close button.
 */
lightboxClose.addEventListener("click", closeLightbox);


/*
 * Previous and next buttons.
 */
lightboxPrev.addEventListener("click", () => {
    showImage(currentIndex - 1);
});

lightboxNext.addEventListener("click", () => {
    showImage(currentIndex + 1);
});


/*
 * Clicking the dark area outside the photograph
 * also closes the lightbox.
 */
lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/*
 * Keyboard controls.
 */
document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showImage(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
        showImage(currentIndex + 1);
    }

});