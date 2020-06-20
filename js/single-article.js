//varibales
const navToggler = document.querySelector('.navbar-toggler');
const navbar = document.querySelector('.navbar');

const hero = document.querySelector('.hero');
const insideHero = document.querySelector('.inside-hero');

navToggler.onclick = () => {
	navToggler.classList.toggle('acrive-navbar');
	//allways show baground navbar collapse
	navbar.classList.toggle('showNavBg');
};

document.addEventListener('DOMContentLoaded', () => {
	let ui = new UI();
	ui.getSingleArticale();
});
