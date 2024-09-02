// Exécution du script dès que le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.navbar-burger'); // Sélection Navbar burger
    const menu = document.querySelector('#navMenu');         // Sélection Navbar menu

    burger.addEventListener('click', () => {    // Ajoute un écouteur d'événement au bouton burger
        burger.classList.toggle('is-active');   // Ajoute ou retire la classe is-active à l'élément burger
        menu.classList.toggle('is-active');     // Ajoute ou retire la classe is-active à l'élément menu 
    });
});