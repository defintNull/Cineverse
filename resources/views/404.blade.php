<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Bevan" rel="stylesheet">

    <!-- Styles / Scripts -->
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/404.css', 'resources/js/404.js'])
    @endif
</head>
<body>
    <p>HTTP: <span>404</span></p>

    <code><span>this_page</span>.<em>not_found</em> = true;</code>
    <code>
        <span>if</span> (<b>you_spelt_it_wrong</b>) {<span>try_again()</span>;}
    </code>
    <code>
        <span>else if (<b>we_screwed_up</b>)</span> {
            <em>alert</em>(<i>"We're really sorry about that."</i>);
            <span>window</span>.<em>location</em> = home;
        }
    </code>

    <center><a href="/">HOME</a></center>
</body>
</html>
