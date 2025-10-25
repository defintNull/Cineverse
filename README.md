# 🎬 Cineverse

Cineverse è una piattaforma web dedicata agli appassionati di cinema e serie TV, progettata per offrire un’esperienza completa di scoperta, consultazione e gestione dei propri titoli preferiti. L’applicazione consente di esplorare un vasto catalogo di film e serie provenienti da tutto il mondo, sfruttando le informazioni messe a disposizione da API esterne come [The Movie Database (TMDB)](https://www.themoviedb.org/).
Oltre alla consultazione dei contenuti, gli utenti possono creare o unirsi a gruppi tematici, all’interno dei quali è possibile visualizzare, pubblicare e commentare post, favorendo così la condivisione di opinioni, consigli e discussioni con altri appassionati.

## 🚀 Tecnologie utilizzate

- **Laravel** – Backend solido e scalabile  
- **JavaScript** – Interattività lato client  
- **Tailwind CSS** – Styling moderno e responsivo  
- **Node.js** – Gestione pacchetti e strumenti di build

## 🛠️ Installazione

### 1. Prerequisiti

Assicurati di avere installato:

- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- Un database a scelta (MySQL, PostgreSQL, SQLite, ecc.)

### 2. Clonazione del progetto

Clonare il progetto attraverso il comando nella destinazione desiderata (genererà una nuova cartella con il nome del progetto)

```bash
git clone https://github.com/tuo-utente/cineverse.git
cd cineverse
```

### 3. Installazione delle dipendenze

Installare le dipendenze con i comandi

```bash
composer install
npm install
```

### 4. Configurazione dell'ambiente

- Copia il file `.env.example` e rinominalo in `.env`.  
Modifica la configurazione in base alla tua macchina, in particolare la sezione relativa al database.

- Se hai scelto un database non convenzionale (es. NoSQL), assicurati di aggiornare anche il file `config/database.php` con le impostazioni appropriate.

- Genera la chiave dell'app Laravel con il comando:

```bash
php artisan key:generate
```

- Crea un database con lo stesso nome indicato nel file .env, quindi esegui il comando per creare le tabelle e popolarle con i dati iniziali:

```bash
php artisan migrate --seed
```

### ▶️ Avvio dell'applicazione

Per avviare il progetto, esegui i seguenti comandi all'interno della cartella di lavoro:

```bash
php artisan serve
npm run dev
```

Il server sarà disponibile su `localhost` alla porta `8000`
