const introVideo = document.getElementById("introVideo");
const main = document.getElementById("main");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicStarted = false;

/* =========================
   تشغيل الموسيقى لأول مرة
========================= */
function startMusic() {
    if (musicStarted) return;

    musicStarted = true;

    music.muted = false;
    music.volume = 0.4;

    music.play().catch(() => {});
}

/* =========================
   INTRO VIDEO CONTROL
========================= */
if (introVideo && main) {

    introVideo.playbackRate = 0.5;
    introVideo.muted = true;

    // 🔥 أول click = تشغيل فيديو + موسيقى
    introVideo.addEventListener("click", () => {
        startMusic();
        introVideo.play();
    });

    // لما الفيديو يخلص
    introVideo.addEventListener("ended", () => {

        introVideo.style.opacity = "0";

        setTimeout(() => {

            introVideo.style.display = "none";
            main.style.display = "block";

            // 🔥 مهم جدًا: تشغيل أنيميشن الموقع
            setTimeout(() => {
                main.classList.add("show");
            }, 100);

        }, 800);
    });
}

/* =========================
   MUSIC BUTTON CONTROL
========================= */
if (musicBtn && music) {

    musicBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        startMusic();

        if (music.paused) {
            music.play();
            musicBtn.classList.add("playing");
        } else {
            music.pause();
            musicBtn.classList.remove("playing");
        }
    });
}

/* =========================
   FALLBACK (لو مفيش intro click)
========================= */
window.addEventListener("load", () => {
    // لو المستخدم دخل مباشرة بدون intro interaction
    setTimeout(() => {
        if (main.style.display !== "block") return;

        main.classList.add("show");
    }, 200);
});