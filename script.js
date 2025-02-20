const API_KEY = "c41fc18e37d34b16897379001f0a4951";
let currentTopic = "technology";
let page = 1;
let loading = false;
let loadedArticles = new Set(); // Speichert bereits geladene Artikel-URLs

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("news-page")) {
        fetchNews(); // Erste Artikel laden
    }
});

// Funktion zum Abrufen der News
async function fetchNews() {
    if (loading) return;
    loading = true;

    const NEWS_URL = `https://newsapi.org/v2/top-headlines?category=${currentTopic}&language=en&sortBy=publishedAt&page=${page}&pageSize=10&apiKey=${API_KEY}`;

    try {
        const response = await fetch(NEWS_URL);
        const data = await response.json();

        if (data.status !== "ok" || !data.articles || data.articles.length === 0) {
            console.warn("⚠️ Keine neuen Artikel!");
            return;
        }

        // Neue Artikel filtern (verhindert Duplikate)
        const newArticles = data.articles.filter(article => !loadedArticles.has(article.url));
        newArticles.forEach(article => loadedArticles.add(article.url));

        if (newArticles.length > 0) {
            renderArticles(newArticles);
            page++; // Nächste Seite abrufen
        }
    } catch (error) {
        console.error("❌ Fehler beim Laden der News:", error);
    } finally {
        loading = false;
    }
}

// Funktion zum Rendern der Artikel
function renderArticles(articles) {
    const newsContainer = document.getElementById("news-container");

    articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item", "bg-white", "rounded-lg", "shadow-md", "p-4");

        newsItem.innerHTML = `
            <img src="${article.urlToImage || 'https://placehold.co/350x200'}" alt="News Image" class="rounded-lg w-full mb-3">
            <h2 class="text-lg font-semibold">${article.title}</h2>
            <p class="text-gray-600 text-sm">${article.description || "No description available"}</p>
            <div class="news-meta flex justify-between items-center mt-3">
                <span class="text-gray-500 text-xs">${new Date(article.publishedAt).toLocaleDateString()}</span>
                <a href="${article.url}" target="_blank" class="read-more text-yellow-500 hover:text-yellow-600">Read more →</a>
            </div>
        `;

        newsContainer.appendChild(newsItem);
    });
}

// Infinite Scrolling Event
window.addEventListener("scroll", () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 1000)) {
        fetchNews();
    }
});


// Funktion zum Kürzen der Beschreibung
function truncateDescription(text) {
    if (!text) return "No description available";
    const sentences = text.split(". "); // Teile den Text in Sätze
    return sentences.length > 1 ? sentences[0] + "..." : text;
}


// Funktion für Infinite Scrolling
function setupInfiniteScroll() {
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            fetchNews();
        }
    });
}
