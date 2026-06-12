const timeline = document.querySelector(".timeline");

let isDown = false;
let startX;
let scrollLeft;
let isDragging = false;

if (timeline) {

    /* ===== DESKTOP ONLY ===== */

    timeline.addEventListener("mousedown", (e) => {
        isDown = true;
        isDragging = false;
        startX = e.pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
        timeline.style.cursor = "grabbing";
    });

    timeline.addEventListener("mouseleave", () => {
        isDown = false;
        timeline.style.cursor = "grab";
    });

    timeline.addEventListener("mouseup", () => {
        isDown = false;
        timeline.style.cursor = "grab";
    });

    timeline.addEventListener("mousemove", (e) => {
        if (!isDown) return;

        const x = e.pageX - timeline.offsetLeft;
        const walk = (x - startX) * 1.5;

        if (Math.abs(walk) > 5) {
            isDragging = true;
        }

        timeline.scrollLeft = scrollLeft - walk;
    });

    /* منع الكليك أثناء السحب */
    timeline.addEventListener("click", (e) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);
}