const mainDiv = document.querySelector('.main');
const navLinks = document.querySelectorAll('.nav-link');
class Articles {
	async getAllContent() {
		try {
			let content = await client.getEntries();
			let articles = content.items;

			console.log(articles);

			articles = articles.map((item) => {
				const { quote, title, articleBody, category } = item.fields;
				const { id } = item.sys;
				const image = item.fields.image.fields.file.url;
				const heroImage = item.fields.heroImage.fields.file.url;

				return { title, heroImage, image, articleBody, quote, id, category };
			});
			return articles;
		} catch (e) {
			console.log(e);
		}
	}
}

class UI {
	paulateAll(articles) {
		for (let i = 0; i < articles.length; i++) {
			let div = document.createElement('div');
			div.className = 'article-bg col-md-5 col-lx-4 mt-4';
			div.style.backgroundImage = `url(${articles[i].heroImage})`;
			div.style.backgroundRepeat = 'no-repeat';
			div.style.backgroundSize = 'cover';
			div.style.backgroundPosition = 'center';
			div.id = articles[i].id;
			div.innerHTML = `
			<div class="article-title" id="${articles[i].id}">
			        <p id="${articles[i].id}">${articles[i].category}</p>
			        <h5 id="${articles[i].id}">${articles[i].title}</h5>
			    </div>
			`;
			mainDiv.appendChild(div);
		}
	}
	paulateCategory(articles, category) {
		for (let i = 0; i < articles.length; i++) {
			if (articles[i].category == category) {
				let div = document.createElement('div');
				div.className = 'article-bg col-md-5 col-lx-4 mt-4';
				div.style.backgroundImage = `url(${articles[i].heroImage})`;
				div.style.backgroundRepeat = 'no-repeat';
				div.style.backgroundSize = 'cover';
				div.style.backgroundPosition = 'center';
				div.id = articles[i].id;
				div.innerHTML = `
			<div class="article-title" id="${articles[i].id}">
			        <p id="${articles[i].id}">${articles[i].category}</p>
			        <h5 id="${articles[i].id}">${articles[i].title}</h5>
			    </div>
			`;
				mainDiv.appendChild(div);
			}
		}
	}
	openArticalePage() {
		mainDiv.addEventListener('click', (e) => {
			e.preventDefault();
			let id = e.target.id;
			let article = Storage.getArticle(id);
			Storage.saveSingleArticle(article);
			window.location = 'single-article.html';
		});
	}
	getSingleArticale() {
		let article = Storage.getSingleArticle();

		//all active links and add athe activ class to the catigury that clicked
		navLinks.forEach((link) => {
			link.classList.remove('active-category');

			if (link.id == article.category) {
				link.classList.add('active-category');
			}
		});

		document.title = article.title;
		//change the hero img
		hero.style.backgroundImage = `url(${article.heroImage})`;
		//removing the title
		insideHero.innerHTML = '';
		//adding the articale title
		insideHero.innerHTML = `
			<h2 class="col-10">${article.title}</h2>
			`;
		//change background of the body
		document.body.style.background = 'var(--mainWhite)';
		document.body.style.color = 'var(--mainBlack)';
		mainDiv.innerHTML = '';
		mainDiv.className = '';
		mainDiv.className = 'main single-article mx-auto py-5 col-11 col-lg-9 row justify-content-around';
		mainDiv.innerHTML = `
			<img class="pt-5" src=${article.image} alt="">
			${article.articleBody}
			<img class="mr-auto" style="width: 50px; height: 50px;" src="images/quote.svg" alt="">
		   <br>
		   <h1 style="font-size: 50px;">${article.quote}</h1>
			`;
	}
}
class Storage {
	static saveArticles(articles) {
		localStorage.setItem('articles', JSON.stringify(articles));
	}
	static getArticle(id) {
		let articles = JSON.parse(localStorage.getItem('articles'));
		return articles.find((article) => article.id == id);
	}
	static saveSingleArticle(singleArticle) {
		localStorage.setItem('singleArticle', JSON.stringify(singleArticle));
	}
	static getSingleArticle() {
		let article = JSON.parse(localStorage.getItem('singleArticle'));

		return article;
	}
}
