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
    <div class="flex flex-col min-h-screen bg-gray-100 w-full">

        <!-- Icona profilo utente -->
        <div class="w-full flex justify-end mt-6 pr-8">
            <a href="" class="flex items-center space-x-2 group">
                <span class="sr-only">Profilo</span>
                <svg class="w-10 h-10 rounded-full border-2 border-blue-600 group-hover:border-blue-800 bg-gray-200 text-blue-600"
                    fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
            </a>
        </div>

        <!-- Barra di ricerca con filtri -->
        <section class="w-full mb-6 bg-white rounded-lg shadow p-6">
            <form id="searchForm" class="flex flex-col md:flex-row md:flex-wrap items-center gap-4">
                <input type="text" name="query" placeholder="Cerca film..." id="searchBox"
                    class="flex-1 min-w-0 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <select name="genre" id="genreSelect"
                    class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">Tutti i generi</option>
                    <option value="azione">Azione</option>
                    <option value="commedia">Commedia</option>
                    <option value="dramma">Dramma</option>
                </select>
                <select name="year" id="yearSelect"
                    class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">Tutti gli anni</option>
                </select>
                <button type="submit" id="search-btn"
                    class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Cerca</button>
            </form>
        </section>

        <!-- Sezione film popolari -->
        <section class="w-full mb-6 bg-white rounded-lg shadow p-6">
            <h2 class="text-2xl font-semibold mb-4 text-center">Film popolari</h2>
            <div id="popularMoviesSection" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Film popolari caricati da JS -->
            </div>
        </section>

        <!-- Sezione film da vedere -->
        <section class="w-full mb-8 bg-white rounded-lg shadow p-6">
            <h2 class="text-2xl font-semibold mb-4 text-center">Da vedere</h2>
            <div id="watchlistSection" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Film da vedere caricati da JS -->
            </div>
        </section>
    </div>

    <footer class="text-center py-4 bg-gray-200">
        <p>&copy; 2025 Cineverse. Tutti i diritti riservati.</p>
    </footer>
</body>

</html>
