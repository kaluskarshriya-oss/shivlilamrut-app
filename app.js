let chapters = [];
let chapter = 1;
let fontSize = 20;

fetch("Data/adhyay.json")
  .then(res => res.json())
  .then(data => {
    chapters = data.chapters;
    const saved = localStorage.getItem("lastChapter");
    if (saved) {
      openChapter(parseInt(saved));
    } else {
      showChapterList();
    }
  });


function showChapterList() {
  document.getElementById("chapter-list-screen").style.display = "block";
  document.getElementById("reading-screen").style.display = "none";
  document.getElementById("reader-footer").style.display = "none";

  const list = document.getElementById("chapter-list");
  list.innerHTML = "";

  chapters.forEach(ch => {
    const li = document.createElement("li");
    li.innerText = ch.title;
    li.onclick = () => openChapter(ch.id);
    list.appendChild(li);
  });
}

function openChapter(id) {
  chapter = id;
  localStorage.setItem("lastChapter", chapter);
  loadChapter();

  document.getElementById("chapter-list-screen").style.display = "none";
  document.getElementById("reading-screen").style.display = "block";
  document.getElementById("reader-footer").style.display = "flex";
}

function loadChapter() {
  const ch = chapters.find(c => c.id === chapter);
  if (!ch) return;

  document.getElementById("chapter-title").innerText = ch.title;
  document.getElementById("chapter-content").innerText = ch.content;
}

function nextChapter() {
  if (chapter < chapters.length) {
    chapter++;
    loadChapter();
  }
}

function prevChapter() {
  if (chapter > 1) {
    chapter--;
    loadChapter();
  }
}

function increaseFont() {
  fontSize += 2;
  document.getElementById("chapter-content").style.fontSize = fontSize + "px";
}

function decreaseFont() {
  if (fontSize > 14) {
    fontSize -= 2;
    document.getElementById("chapter-content").style.fontSize = fontSize + "px";
  }
}

function toggleMode() {
  document.body.classList.toggle("dark");
}

function goBack() {
  showChapterList();
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

