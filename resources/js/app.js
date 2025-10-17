import './bootstrap';

import { Router } from './router';

// Getting router Instance
let router = Router.getInstance();

document.getElementById("home").addEventListener("click", () => {
    router.overridePath({}, "/");
});

// Adding on change path event
window.addEventListener('popstate', function() {
    router.resolve(window.location.pathname);
});

// First path resolution invocation
router.resolve(window.location.pathname);
