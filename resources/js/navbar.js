export class Navbar {
    #navbar;

    constructor() {
        this.#navbar = document.getElementById("navbar")
    }
    changeSelectedNavbarLink(id) {
        this.#navbar.querySelector("p.border-b-2").classList.remove("border-b-2");
        let button = document.getElementById("navbar_" + id);
        if(button == null) {
            return false;
        }
        button.classList.add("border-b-2");
    }
}
