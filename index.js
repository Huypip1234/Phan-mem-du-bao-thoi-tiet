const app_id = 'f887e2b453b04dfb0964a9fd115570d3';

const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');

const mtMoc = document.querySelector('.mt-moc');
const mtLan = document.querySelector('.mt-lan');
const doAm = document.querySelector('.do-am');
const vanTocGio = document.querySelector('.van-toc-gio');

searchInput.addEventListener('change', function(x) { 
    //change: bat su kien khi gia tri input bi thay doi
    //Tham số x tự được truyền giá trị vào khi bắt sự kiện thành công (trả về 1 đối tượng như ở dưới)
    //console.log(x);
    //in ra: 
    //Event {isTrusted: true, type: "change", target: input#search-input, currentTarget: input#search-input, eventPhase: 2, …}
    console.log(x.target.value);
    //x.target.value (truy xuat tu cai doi tuong console.log o tren) tuong duong searchInput.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${x.target.value}&appid=${app_id}&units=metric&lang=vi`)
    //units=metric: chuyen do F sang do C (thong tin o trang chu)
    //lang=vi: ngon ngu tieng viet (thong tin o trang chu)
        .then(resp => {
            return resp.json();
        })
        .then(resp => {
            //render ra trinh duyet
            console.log(resp);
            cityName.innerHTML = resp.name;
            weatherState.innerHTML = resp.weather[0].description; //[0] vi weather tra ve 1 mang array
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${resp.weather[0].icon}@2x.png`);
            temperature.innerHTML = Math.round(resp.main.temp);

            mtMoc.innerHTML = moment.unix(resp.sys.sunrise).format('H:mm');
            mtLan.innerHTML = moment.unix(resp.sys.sunset).format('H:mm');
            doAm.innerHTML = resp.main.humidity
            vanTocGio.innerHTML = (resp.wind.speed * 3.6).toFixed(2) //doi tu m/s -> km/h va lay 2 so thap phan

        })
});
