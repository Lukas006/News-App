const API_KEY = "c41fc18e37d34b16897379001f0a4951";
let currentPage = 1; // Anfangsseite
const pageSize = 10; // Anzahl der Artikel pro Abruf
let currentTopic = 'technology'; // Standardmäßig 'technology'

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("news-page")) {
        fetchNews(); // News beim Laden der Seite abrufen
    }
});


// Funktion zum Abrufen der Nachrichten
function fetchNews() {
    const topicSelect = document.getElementById('topic-select');
    currentTopic = topicSelect.value;

    const NEWS_URL = `https://newsapi.org/v2/top-headlines?category=${currentTopic}&language=en&sortBy=publishedAt&pageSize=90&apiKey=${API_KEY}`;

    const PROXY_URL = "https://corsproxy.io/?";
    const FETCH_URL = PROXY_URL + encodeURIComponent(NEWS_URL);

    fetch(FETCH_URL)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);  // Debugging: Zeigt die API-Antwort
            if (!data.articles) {
                console.error("Fehler: 'articles' ist undefined!", data);
                return;
            }
            renderArticles(data.articles);
        })
        .catch(error => console.error("Fehler beim Laden der News:", error));
}




// Funktion zum Kürzen der Beschreibung
function truncateDescription(text) {
    if (!text) return "No description available";
    const sentences = text.split('. '); // Teile den Text in Sätze
    return sentences.length > 1 ? sentences[0] + "..." : text;
}

// Funktion zum Rendern der Artikel
function renderArticles(articles) {
    const newsContainer = document.getElementById("news-container");

    if (articles.length === 0) {
        newsContainer.innerHTML = "<p class='text-center text-gray-500'>No articles available for this topic.</p>";
        return;
    }

    articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item", "bg-white", "rounded-lg", "shadow-md", "p-4");

        newsItem.innerHTML = `
            <img src="${article.urlToImage || 'https://placehold.co/350x200'}" alt="News Image" class="rounded-lg w-full mb-3">
            <h2 class="text-lg font-semibold">${article.title}</h2>
            <p class="text-gray-600 text-sm">${truncateDescription(article.description)}</p>
            <div class="news-meta flex justify-between items-center mt-3">
                <span class="text-gray-500 text-xs">${new Date(article.publishedAt).toLocaleDateString()}</span>
                <a href="${article.url}" target="_blank" class="read-more text-yellow-500 hover:text-yellow-600">Read more →</a>
            </div>
        `;

        newsContainer.appendChild(newsItem);
    });
}

// Scroll-Event-Listener hinzufügen
document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    // Überprüfe, ob der Benutzer fast am Ende der Seite ist
    if (scrollPosition >= pageHeight - 100) {
        fetchNews(); // Neue Artikel nachladen
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // API URL für die News-API
    const url = `https://newsapi.org/v2/top-headlines?category=technology&apiKey=${API_KEY}`;

    // Holen der Artikel von der News-API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Hier holen wir den ersten Artikel
            const articles = data.articles;
            const firstArticle = articles[0];

            // Zeige den Artikel auf der Home-Seite an
            displayFirstArticleOnHome(firstArticle);

            // Zeige den Artikel auf der News-Seite an
            displayArticlesOnNewsPage(articles);
        })
        .catch(error => {
            console.error("Error fetching articles:", error);
        });

    // Funktion, um den ersten Artikel auf der Home-Seite anzuzeigen
    function displayFirstArticleOnHome(article) {
        const homePage = document.getElementById('home-page');

        // HTML-Element für den Artikel
        const articleHTML = `
            <div class="popular-article p-6 bg-white rounded-lg shadow-md mb-6">
                <h2 class="text-xl font-semibold text-gray-800">Popular Tech Article</h2>
                <div class="article-item bg-gray-100 rounded-lg p-4 shadow-sm">
                    <img src="${article.urlToImage}" class="rounded-lg w-full mb-3" alt="Article Image">
                    <h3 class="text-xl font-semibold text-gray-800">${article.title}</h3>
                    <p class="text-gray-600 text-sm mt-2">${article.description ? article.description : 'No description available.'}</p>
                    <a href="${article.url}" target="_blank" class="text-yellow-500 mt-3 font-semibold hover:underline">Read More...</a>
                </div>
            </div>
        `;

        // Füge den Artikel HTML in den Home-Page Container ein
        homePage.innerHTML += articleHTML;
    }

    // Funktion, um die Artikel auf der News-Seite anzuzeigen
    function displayArticlesOnNewsPage(articles) {
        const newsPage = document.getElementById('news-page');
        const articleContainer = newsPage.querySelector('.article-container');

        // Loop durch alle Artikel und rendere sie auf der News-Seite
        articles.forEach(article => {
            const articleHTML = `
                <div class="article-item bg-gray-100 rounded-lg p-4 shadow-sm mb-4">
                    <img src="${article.urlToImage}" class="rounded-lg w-full mb-3" alt="Article Image">
                    <h3 class="text-xl font-semibold text-gray-800">${article.title}</h3>
                    <p class="text-gray-600 text-sm mt-2">${article.description ? article.description : 'No description available.'}</p>
                    <a href="${article.url}" target="_blank" class="text-yellow-500 mt-3 font-semibold hover:underline">Read More...</a>
                </div>
            `;

            // Füge jeden Artikel zur News-Seite hinzu
            articleContainer.innerHTML += articleHTML;
        });
    }
});

export default async function handler(req, res) {
    const url = `https://newsapi.org/v2/top-headlines?category=technology&apiKey=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const url = '/api/news';  // Vercel Serverless Function URL

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            const firstArticle = articles[0];

            // Zeige den Artikel auf der Home-Seite an
            displayFirstArticleOnHome(firstArticle);

            // Zeige den Artikel auf der News-Seite an
            displayArticlesOnNewsPage(articles);
        })
        .catch(error => {
            console.error("Error fetching articles:", error);
        });

    function displayFirstArticleOnHome(article) {
        const homePage = document.getElementById('home-page');
        const articleHTML = `
            <div class="popular-article p-6 bg-white rounded-lg shadow-md mb-6">
                <h2 class="text-xl font-semibold text-gray-800">Popular Tech Article</h2>
                <div class="article-item bg-gray-100 rounded-lg p-4 shadow-sm">
                    <img src="${article.urlToImage}" class="rounded-lg w-full mb-3" alt="Article Image">
                    <h3 class="text-xl font-semibold text-gray-800">${article.title}</h3>
                    <p class="text-gray-600 text-sm mt-2">${article.description ? article.description : 'No description available.'}</p>
                    <a href="${article.url}" target="_blank" class="text-yellow-500 mt-3 font-semibold hover:underline">Read More...</a>
                </div>
            </div>
        `;
        homePage.innerHTML += articleHTML;
    }

    function displayArticlesOnNewsPage(articles) {
        const newsPage = document.getElementById('news-page');
        const articleContainer = newsPage.querySelector('.article-container');
        articles.forEach(article => {
            const articleHTML = `
                <div class="article-item bg-gray-100 rounded-lg p-4 shadow-sm mb-4">
                    <img src="${article.urlToImage}" class="rounded-lg w-full mb-3" alt="Article Image">
                    <h3 class="text-xl font-semibold text-gray-800">${article.title}</h3>
                    <p class="text-gray-600 text-sm mt-2">${article.description ? article.description : 'No description available.'}</p>
                    <a href="${article.url}" target="_blank" class="text-yellow-500 mt-3 font-semibold hover:underline">Read More...</a>
                </div>
            `;
            articleContainer.innerHTML += articleHTML;
        });
    }
});

if (!window.ethereum) {
    // Setze das ethereum-Objekt, falls es nicht existiert
    window.ethereum = new EthereumProvider();
}
