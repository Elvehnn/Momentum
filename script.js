//Background images
function getRandomNumber6() {
	let array = [];
	while (array.length < 6) {
		let number = Math.floor(Math.random() * 20) + 1;
		if (!array.includes(number)) {
			array.push(number);
		}
	}
	return array.map((item) => {
		return item < 10 ? '0' + item : String(item);
	});
}

let dailyImagesArray = [];
let partsOfDay = ['night', 'morning', 'day', 'evening'];

function fillDailyImagesArray() {
	partsOfDay.forEach((item) => {
		let imagesDirectoryUrl = `./assets/${item}/`;
		getRandomNumber6().forEach((item) =>
			dailyImagesArray.push(`${imagesDirectoryUrl}${item}.jpg`)
		);
	});
}

const changeImageButton = document.querySelector('.change-image-button');
changeImageButton.addEventListener('click', changeImageButtonHandler());

function changeImageButtonHandler() {
	let today = new Date(),
		nextHour = today.getHours() + 1;
	return function () {
		changeImageButton.disabled = true;
		if (nextHour === 24) nextHour = 0;
		showImages(nextHour);
		setTimeout(() => (changeImageButton.disabled = false), 800);
		return nextHour++;
	};
}

function showImages(hour) {
	const img = new Image();
	img.src = dailyImagesArray[hour];
	img.onload = () => {
		document.querySelector(
			'.body-container'
		).style.backgroundImage = `url('${dailyImagesArray[hour]}')`;
	};
	// document.querySelector(
	// 	'.body-container'
	// ).style.backgroundImage = `url('${dailyImagesArray[hour]}')`;
}

//WEATHER BLOCK
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {
	try {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=eng&appid=6c2232d98c90e98739074b93f7d54c9e&units=metric`;
		const response = await fetch(url);
		const data = await response.json();

		weatherIcon.className = 'weather-icon owf';
		weatherIcon.classList.add(`owf-${data.weather[0].id}`);
		temperature.innerText = `${data.main.temp}°`;
		weatherDescription.innerText = data.weather[0].description;
	} catch (err) {
		localStorage.removeItem('city');
		weatherIcon.innerText = '';
		temperature.innerText = '';
		weatherDescription.innerText = '';
		alert('Невозможно отобразить данные');
	}
}

//Get city
function getCity() {
	if (localStorage.getItem('city') === null) {
		city.textContent = '[Enter Location]';
	} else {
		city.textContent = localStorage.getItem('city');
		getWeather();
	}
}

// Set city
function setCity(e) {
	if (e.type === 'keypress') {
		if (e.which == 13 || e.keyCode == 13) {
			if (!e.target.innerText) {
				getCity();
				return;
			}
			localStorage.setItem('city', city.textContent);
			city.blur();
			return;
		}
	} else if (e.type === 'click') {
		console.log('empty', e.target);
		city.textContent = '';
	} else if (e.type === 'blur') {
		getCity();
		console.log('blur', e.target, e.type);
	} else {
		console.log('something else', e.target, e.type);
	}
}

city.addEventListener('click', setCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
getCity();

// Central block
const timer = document.querySelector('.timer'),
	welcome = document.querySelector('.welcome'),
	name = document.querySelector('.name'),
	date = document.querySelector('.date'),
	focus = document.querySelector('.focus');

function showTime() {
	let today = new Date(),
		hour = today.getHours(),
		minute = today.getMinutes(),
		second = today.getSeconds(),
		day = today.getDay(),
		month = today.getMonth(),
		dateOfMonth = today.getDate();

	const namesOfDays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	const namesOfMonths = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	if (minute === 0 && second === 0) {
		showImages(hour);
	}

	timer.innerHTML = `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
	date.innerHTML = `${namesOfDays[day]}, ${dateOfMonth} ${namesOfMonths[month]}`;

	setTimeout(showTime, 1000);
}

function addZero(value) {
	return (value < 10 ? '0' : '') + value;
}

// Set Background and Greeting
function setBackgroundAndGreeting() {
	let today = new Date(),
		hour = today.getHours();

	showImages(hour);

	if (hour >= 6 && hour < 12) {
		welcome.textContent = 'Good morning, ';
	} else if (hour < 18 && hour >= 12) {
		welcome.textContent = 'Good day, ';
	} else if (hour >= 18 && hour < 24) {
		welcome.textContent = 'Good evening, ';
		document.querySelector('.body-container').style.color = 'white';
	} else {
		welcome.textContent = 'Good night, ';
		document.querySelector('.body-container').style.color = 'white';
	}
}

// Get Name
function getName() {
	if (localStorage.getItem('name') === null) {
		name.textContent = `[Enter Name]`;
	} else {
		name.textContent = localStorage.getItem('name');
	}
}

// Set Name
function setName(e) {
	if (e.type === 'keypress') {
		if (e.which == 13 || e.keyCode == 13) {
			if (e.target.innerText) {
				localStorage.setItem('name', e.target.innerText);
			} else getName();
			name.blur();
		}
	} else if (e.type === 'click') {
		name.textContent = '';
	} else {
		getName();
	}
}

// Get Focus
function getFocus() {
	if (localStorage.getItem('focus') === null) {
		focus.textContent = '[Enter Focus]';
	} else {
		focus.textContent = localStorage.getItem('focus');
	}
}

// Set Focus
function setFocus(e) {
	if (e.type === 'keypress') {
		if (e.which == 13 || e.keyCode == 13) {
			if (e.target.innerText) {
				localStorage.setItem('focus', e.target.innerText);
			} else getFocus();
			focus.blur();
		}
	} else if (e.type === 'click') {
		focus.textContent = '';
	} else {
		getFocus();
	}
}
name.addEventListener('click', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
fillDailyImagesArray();
showTime();
setBackgroundAndGreeting();
getName();
getFocus();

//Quote Block
const changeQuoteButton = document.querySelector('.change-quote-button');

function createElement(teg, className, text) {
	let element = document.createElement(teg);
	element.classList.add(className);
	element.innerText = text;
	return element;
}

async function getQuote() {
	document.querySelector('.quote').remove();
	changeQuoteButton.disabled = true;

	const url = `https://api.adviceslip.com/advice`;
	const res = await fetch(url);
	const data = await res.json();

	let newBlockquote = createElement('blockquote', 'quote', data.slip.advice);
	document.querySelector('.quote-wrapper').prepend(newBlockquote);
	setTimeout(() => (changeQuoteButton.disabled = false), 2000);
}

document.addEventListener('DOMContentLoaded', getQuote);
changeQuoteButton.addEventListener('click', getQuote);
