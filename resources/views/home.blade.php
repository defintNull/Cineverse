<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <!-- Styles / Scripts -->
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif
</head>

<body>
    <div>
        <!-- Barra di ricerca con filtri -->
        <section>
            <form id="searchForm">
                <input type="text" name="query" placeholder="Cerca film..." id="searchBox">
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
                <button type="submit" id="search-btn">Cerca</button>
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


    </div>
    <footer>
        <p>&copy; 2025 Cineverse. Tutti i diritti riservati.</p>
    </footer>
</body>

</html>
