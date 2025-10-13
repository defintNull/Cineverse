<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- Barra di ricerca con filtri -->
    <section>
        <form id="searchForm">
            <input type="text" name="query" placeholder="Cerca film...">
            <select name="genre" id="genreSelect">
                <option value="">Tutti i generi</option>
                <option value="azione">Azione</option>
                <option value="commedia">Commedia</option>
                <option value="dramma">Dramma</option>
                <!-- Altri generi -->
            </select>
            <select name="year" id="yearSelect">
                <option value="">Tutti gli anni</option>
            </select>
            <button type="submit">Cerca</button>
        </form>
    </section>

    <!-- Sezione profilo -->
    <section>
        <h2>Profilo</h2>
        <div id="profileSection">
            <!-- Profilo caricato da JS -->
        </div>
    </section>

    <!-- Sezione film popolari -->
    <section>
        <h2>Film popolari</h2>
        <div id="popularMoviesSection">
            <!-- Film popolari caricati da JS -->
        </div>
    </section>

    <!-- Sezione film da vedere -->
    <section>
        <h2>Da vedere</h2>
        <div id="watchlistSection">
            <!-- Film da vedere caricati da JS -->
        </div>
    </section>

    <script>
        // Popola gli anni nel select
        const yearSelect = document.getElementById('yearSelect');
        const currentYear = new Date().getFullYear();
        for (let y = currentYear; y >= 1980; y--) {
            const option = document.createElement('option');
            option.value = y;
            option.textContent = y;
            yearSelect.appendChild(option);
        }

        // Esempio di caricamento dati via JS (da sostituire con fetch API)
        document.getElementById('profileSection').innerHTML = `
            <p>Nome utente: Ospite</p>
            <a href="#">Visualizza profilo</a>
        `;

        // Carica film popolari
        const popularMovies = [
            { title: 'Film 1', poster: 'poster1.jpg' },
            { title: 'Film 2', poster: 'poster2.jpg' }
        ];
        document.getElementById('popularMoviesSection').innerHTML = popularMovies.map(movie => `
            <div>
                <img src="${movie.poster}" alt="${movie.title}" width="100">
                <p>${movie.title}</p>
            </div>
        `).join('');

        // Carica watchlist
        const watchlist = [
            { title: 'Film 3', poster: 'poster3.jpg' },
            { title: 'Film 4', poster: 'poster4.jpg' }
        ];
        document.getElementById('watchlistSection').innerHTML = watchlist.map(movie => `
            <div>
                <img src="${movie.poster}" alt="${movie.title}" width="100">
                <p>${movie.title}</p>
            </div>
        `).join('');
    </script>
</body>
</html>