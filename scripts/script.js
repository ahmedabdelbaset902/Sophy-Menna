const introVideo = document.getElementById("introVideo");
const intro = document.getElementById("intro"); // ✅ تصحيح مهم
const main = document.getElementById("main");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");

let musicStarted = false;

/* =========================
   MUSIC
========================= */
function startMusic() {

    if (musicStarted) return;

    musicStarted = true;

    music.muted = false;
    music.volume = 0.4;

    music.play().catch(() => {});
}

/* =========================
   ICON
========================= */
if (music) {

    music.addEventListener("play", () => {
        musicBtn?.classList.add("playing");

        musicIcon?.classList.replace("fa-music", "fa-volume-high");
    });

    music.addEventListener("pause", () => {
        musicBtn?.classList.remove("playing");

        musicIcon?.classList.replace("fa-volume-high", "fa-music");
    });
}

/* =========================
   VIDEO FIX
========================= */
if (introVideo) {

    introVideo.muted = true;
    introVideo.playsInline = true;
    introVideo.setAttribute("playsinline", "");
    introVideo.setAttribute("webkit-playsinline", "");
}

/* =========================
   START
========================= */
document.addEventListener("click", async () => {

    if (!introVideo) return;

    startMusic();

    try {
        await introVideo.play(); // ✅ أهم تعديل
    } catch (e) {
        console.log("video play failed", e);
    }

}, { once: true });

/* =========================
   END VIDEO
========================= */
introVideo?.addEventListener("ended", () => {

    if (intro) {
        intro.style.opacity = "0";
        intro.style.transition = "0.8s ease";
    }

    setTimeout(() => {

        if (intro) intro.style.display = "none";

        main.style.display = "block";

        requestAnimationFrame(() => {
            main.classList.add("show");
        });

        document.body.style.overflow = "auto";

    }, 800);
});

/* =========================
   MUSIC BUTTON
========================= */
musicBtn?.addEventListener("click", (e) => {

    e.stopPropagation();

    if (!musicStarted) {
        startMusic();
        return;
    }

    music.paused ? music.play().catch(() => {}) : music.pause();
});
/* =========================
  add to clender
========================= */

function addToCalendar() {

    const title = "حفل زفاف صبحي & منه";
    const details = "نتشرف بحضوركم حفل زفافنا";
    const location = " قاعه ليلتي في فندق لوسيال";

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (!isIOS) {

        // Android + Desktop → Google Calendar (timezone-safe)
        const start = "20260621T200000";
const end   = "20260622T010000";

        const googleUrl =
            "https://www.google.com/calendar/render?action=TEMPLATE" +
            "&text=" + encodeURIComponent(title) +
            "&details=" + encodeURIComponent(details) +
            "&location=" + encodeURIComponent(location) +
            "&dates=" + start + "/" + end +
            "&ctz=Africa/Cairo";   // 🔥 أهم سطر

        window.open(googleUrl, "_blank");
        return;
    }

    // iOS → ICS file with timezone
    const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//EN
CALSCALE:GREGORIAN
BEGIN:VTIMEZONE
TZID:Africa/Cairo
END:VTIMEZONE
BEGIN:VEVENT
UID:123456
DTSTAMP:20260601T120000Z
SUMMARY:${title}
DTSTART;TZID=Africa/Cairo:20260621T200000
DTEND;TZID=Africa/Cairo:20260622T010000
LOCATION:${location}
DESCRIPTION:${details}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
        type: "text/calendar;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding.ics";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}