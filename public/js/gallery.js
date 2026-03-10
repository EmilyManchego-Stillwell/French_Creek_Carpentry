document.addEventListener('DOMContentLoaded', () => {
    // Select all gallery sections
    const galleries = document.querySelectorAll('.services-gallery');

    galleries.forEach(gallery => {
        const featureImg = gallery.querySelector('.feature-img');
        const thumbnails = gallery.querySelectorAll('.thumbnail');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // 1. Update the src of the feature image
                featureImg.style.opacity = '0'; // Optional fade out effect
                
                setTimeout(() => {
                    featureImg.src = this.src;
                    featureImg.alt = this.alt;
                    featureImg.style.opacity = '1'; // Fade back in
                }, 200);

                // 2. Update active state styling
                gallery.querySelector('.thumbnail.active').classList.remove('active');
                this.classList.add('active');
            });
        });
    });
});