const client = contentful.createClient({
	// This is the space ID. A space is like a project folder in Contentful terms
	space: '32p8tcnx6vk7',
	// This is the access token for this space. Normally you get both ID and the token in the Contentful web app
	accessToken: 'VfHHBYyaIiPjE5KlgAC7t15QRPEWWwuyCeHofk0PHQg'
});

//varibales
const navToggler = document.querySelector('.navbar-toggler');
const navbar = document.querySelector('.navbar');
const hero = document.querySelector('.hero');
const insideHero = document.querySelector('.inside-hero');

let category = insideHero.id;

navToggler.onclick = () => {
	navToggler.classList.toggle('acrive-navbar');
	//allways show baground navbar collapse
	navbar.classList.toggle('showNavBg');
};

document.addEventListener('DOMContentLoaded', () => {
	let articles = new Articles();
	let ui = new UI();

	articles
		.getAllContent()
		.then((articles) => {
			ui.paulateCategory(articles, category);
		})
		.then(() => {
			ui.openArticalePage();
		});
});
