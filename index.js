// Button events

const toggleExpandedStates = () => {
  const quotes = document.querySelector('.quotes');
  const mainData = document.querySelector('.main-data');
  const detailData = document.querySelector('.detailed-data');
  const btnArrow = document.getElementById('btn-arrow');
  const btnText = document.getElementById('btn-text');

  quotes.classList.toggle('quotes--expanded');
  mainData.classList.toggle('main-data--expanded');
  detailData.classList.toggle('collapsible--expanded');
  btnArrow.classList.toggle('rotate');

  detailData.classList.contains('collapsible--expanded')
    ? (btnText.innerText = 'Less')
    : (btnText.innerText = 'More');
};

const btn = document.querySelector('.btn');
btn.addEventListener('click', toggleExpandedStates);

// Reusable function for fetching api data

const fetchData = async (url) => {
  let controller = new AbortController();

  try {
    const res = await fetch(url, { signal: controller.signal });
    const json = await res.json();

    if (!res.ok) throw new Error(res.status);

    return json;
  } catch (err) {
    if (err.name === 'AbortError') {
      controller.abort();
      console.log('The fetch was aborted');
    }
    console.log(err.message);
  }

  controller = null;
};

// World time api fetch request

(async function () {
  const data = await fetchData('http://worldtimeapi.org/api/ip');

  document.getElementById('timezone').innerText = data.timezone;
  document.getElementById('day-of-year').innerText = data.day_of_year;
  document.getElementById('day-of-week').innerText = data.day_of_week;
  document.getElementById('week-number').innerText = data.week_number;
  document.getElementById('abbreviation').innerText = data.abbreviation;
})();

// Geolocation api fetch request

(async function () {
  const data = await fetchData(
    'https://api.freegeoip.app/json/?apikey=19fd5b00-85b1-11ec-98eb-35f8a49fd3d7'
  );

  document.getElementById(
    'location'
  ).innerText = `${data.region_name}, ${data.country_code}`;
})();

// Programming quotes api fetch request

const fetchQuotes = async () => {
  const data = await fetchData(
    'https://programming-quotes-api.herokuapp.com/Quotes/random'
  );

  document.querySelector('.quotes__text').innerText = data.en;
  document.querySelector('.quotes__author').innerText = data.author;
  document.querySelector('.refresh-icon').classList.toggle('spin');
};

const btnRefresh = document.getElementById('btn--refresh');
btnRefresh.addEventListener('click', fetchQuotes);

// Showing current time and greeting message function

(function showTime() {
  const date = new Date();
  const h = date.getHours();
  let m = date.getMinutes();
  m = m < 10 ? '0' + m : m;

  // const h = 10;

  const greeting = document.getElementById('greeting');

  document.getElementById('hours').innerHTML = h;
  document.getElementById('minutes').innerHTML = m;

  if (h > 5 && h < 12) greeting.innerText = 'Good Morning';
  if (h >= 12 && h < 18) greeting.innerText = 'Good Afternoon';
  if (h >= 18 || h < 5) greeting.innerText = 'Good Evening';

  setTimeout(showTime, 1000);
})();

// Multiple event listener function
function addMultiEvents(element, eventNames, listener) {
  const events = eventNames.split(' ');
  for (let i = 0, iLen = events.length; i < iLen; i++)
    element.addEventListener(events[i], listener, false);
}

// Logic for changing background depending on time of day

addMultiEvents(window, 'load resize', function () {
  const date = new Date();
  const h = date.getHours();
  // const h = 10;
  // White bar in the night time bg is because of the image itself.

  const windowWidth = window.innerWidth;
  const detailData = document.querySelector('.detailed-data');
  const detailDataContent = document.querySelector('.collapsible__content');
  const pList = detailDataContent.getElementsByTagName('p');
  const spanList = detailDataContent.getElementsByTagName('span');

  let sunIcon = document.getElementById('sun-icon');
  let backgroundImageURL;

  if (h >= 18 || h < 5)
    sunIcon.setAttribute('src', 'assets/desktop/icon-moon.svg');

  if (windowWidth < 768)
    backgroundImageURL = 'assets/mobile/bg-image-daytime.jpg';

  if (windowWidth >= 768 && windowWidth < 1440)
    backgroundImageURL = 'assets/tablet/bg-image-daytime.jpg';

  if (windowWidth >= 1440)
    backgroundImageURL = 'assets/desktop/bg-image-daytime.jpg';

  if ((windowWidth < 768 && h >= 18) || h < 5) {
    backgroundImageURL = 'assets/mobile/bg-image-nighttime.jpg';
    detailData.style.background = 'rgba(0, 0, 0, 0.75)';
    detailData.style.backdropFilter = 'blur(10.7742px)';
    for (let item of pList) item.style.color = '#fff';
    for (let item of spanList) item.style.color = '#fff';
  }

  if ((windowWidth >= 768 && windowWidth < 1440 && h >= 18) || h < 5) {
    backgroundImageURL = 'assets/tablet/bg-image-nighttime.jpg';
    detailData.style.background = 'rgba(0, 0, 0, 0.75)';
    detailData.style.backdropFilter = 'blur(10.7742px)';
    for (let item of pList) item.style.color = '#fff';
    for (let item of spanList) item.style.color = '#fff';
  }

  if ((windowWidth >= 1440 && h >= 18) || h < 5) {
    backgroundImageURL = 'assets/desktop/bg-image-nighttime.jpg';
    detailData.style.background = 'rgba(0, 0, 0, 0.75)';
    detailData.style.backdropFilter = 'blur(10.7742px)';
    for (let item of pList) item.style.color = '#fff';
    for (let item of spanList) item.style.color = '#fff';
  }

  document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),url(${backgroundImageURL})`;
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center ';
  document.body.style.backgroundAttachment = 'fixed';
});
