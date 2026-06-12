const introVideo = document.getElementById("introVideo");
const main = document.getElementById("main");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");

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
   ربط شكل الزر بحالة الصوت
========================= */
if (music && musicBtn) {

    music.addEventListener("play", () => {

        musicBtn.classList.add("playing");

        if (musicIcon) {
            musicIcon.classList.remove("fa-music");
            musicIcon.classList.add("fa-volume-high");
        }
    });

    music.addEventListener("pause", () => {

        musicBtn.classList.remove("playing");

        if (musicIcon) {
            musicIcon.classList.remove("fa-volume-high");
            musicIcon.classList.add("fa-music");
        }
    });
}

/* =========================
   FIX iOS VIDEO BEHAVIOR
========================= */
if (introVideo) {

    introVideo.muted = true;
    introVideo.playbackRate = 0.5;

    introVideo.setAttribute("playsinline", "");
    introVideo.setAttribute("webkit-playsinline", "");
}

/* =========================
   START ON FIRST USER CLICK
========================= */
function startIntro() {

    if (!introVideo) return;

    startMusic();

    introVideo.play().catch(() => {});
}

/* أول ضغطة تشغل الفيديو والموسيقى */
document.addEventListener("click", startIntro, { once: true });

/* =========================
   INTRO VIDEO CONTROL
========================= */
if (introVideo && main) {

    introVideo.addEventListener("ended", () => {

        introVideo.style.opacity = "0";
        introVideo.style.pointerEvents = "none";

        setTimeout(() => {

            introVideo.style.display = "none";
            main.style.display = "block";

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

        if (!musicStarted) {
            startMusic();
            return;
        }

        if (music.paused) {
            music.play().catch(() => {});
        } else {
            music.pause();
        }
    });
}

/* =========================
   FALLBACK
========================= */
window.addEventListener("load", () => {

    setTimeout(() => {

        if (main.style.display !== "block") return;

        main.classList.add("show");

    }, 200);
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