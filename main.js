//menambahkan user name dengan prompt
let displayUser = document.getElementById('userName');
let userId = localStorage.getItem('namaUser');

if (!userId || userId === 'null') {
	userId = prompt('お名前を入力してください');
		if (!userId || userId.trim() === "") {
			userId = "ゲスト";
		}
		localStorage.setItem('namaUser', userId);
}
displayUser.innerHTML = userId;
//change user
function resetUser() {
	localStorage.removeItem('namaUser');
}
//menambahkan format date
function formatDate(d){
	const event = new Date(d);

	const hari = event.toLocaleDateString("ja-JP",
		{ weekday: "short"});
	const tanggal = event.toLocaleDateString("ja-JP" , {
		month: "long",
		day: "numeric"
	});
	return { hari, tanggal}
}
//else if untuk kode cuaca
const kodeCerah = [0];
const kodeBerawan = [1, 2, 3];
const kodeKabut = [45, 48];
const kodeGerimis = [51, 53, 55];
const kodeHujan = [61, 63, 65, 80, 81, 82];
const kodeHujanBeku = [56, 57, 66, 67];
const kodeSalju = [71, 73, 75, 77, 85, 86];
const kodePetir = [95, 96, 99];

function getWeatherIcon(x) {
	if (kodeCerah.includes(x)) {
		return 'icon/cerah.png'
	}
	else if (kodeBerawan.includes(x)) {
		return 'icon/berawan.png'
	}
	else if (kodeKabut.includes(x)) {
		return 'icon/kabut.png'
	}
	else if (kodeGerimis.includes(x)) {
		return 'icon/gerimis.png'
	}
	else if (kodeHujan.includes(x)) {
		return 'icon/hujan.png'
	}
	else if (kodeHujanBeku.includes(x)) {
		return 'icon/hujanBeku.png'
	}
	else if (kodeSalju.includes(x)) {
		return 'icon/salju.png'
	}
	else if (kodePetir.includes(x)) {
		return 'icon/petir.png'
	}else {
		return '';
	}
}
//search
async function getWeather() {
	const city = document.getElementById('search-input').value;
	if(!city) {
		alert('お住まいを入力してください');
		return;
	}
	// let city = "Nagano"
	//nama geo
	const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json&countryCode=JP`;
	const geoRes = await fetch(geoUrl);
	const geoData = await geoRes.json();
	// cuaca perkota 
	const longitude = geoData.results[0].longitude;
	const latitude = geoData.results[0].latitude;
	const tenki = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max&timezone=Asia%2FTokyo`;
	//proses data cuaca
	const tenkiRes = await fetch(tenki);
	//objek json
	const tenkiData = await tenkiRes.json();
	//innerHtml
	const container = document.getElementById("container-week");
	// console.log(tenkiData.daily.weather_code)
	//empty list
	container.innerHTML = "";
	// //loop list
	for (let i = 0; i < tenkiData.daily.time.length; i++) {
		const { hari, tanggal} = formatDate(tenkiData.daily.time[i]);
		const suhu = tenkiData.daily.temperature_2m_max[i];
		const kodeCuaca = tenkiData.daily.weather_code[i];
		const iconKode = getWeatherIcon(kodeCuaca);

		const card = `
		<li class ="card-days w-38 text-2xl text-blue-400 font-semibold bg-stone-50 flex flex-col items-center border-3 rounded-lg border-indigo-900/90">
			<p class="text-blue-900">${ hari }</p>
			<p class="text-blue-900 mt-1">${ tanggal }</p>
			<img src ="${iconKode}" alt=weatherIcon.png class="w-15"/>
			<p class="text-xl mt-1 text-fuchsia-900">最高: ${suhu}&deg;</p>
		</li>`;
		container.innerHTML += card;
	}
	const kodeTips = tenkiData.daily.weather_code[0];
	let tipsIcon = '';
	if (kodeCerah.includes(kodeTips)) {
		tipsIcon = 'icon/jemuranOk.png';
	} 
	else if(kodeBerawan.includes(kodeTips)){
		tipsIcon = 'icon/jemuranOk.png';
	} else {
		tipsIcon = 'icon/jemuranNg.png'
	}
	const cardTips = `
	<li class="flex justify-center items-center">
	<p>今日</p>
	<img src="${tipsIcon}" alt="tips.png" class="w-15"/>
	</li>
	`;
	document.getElementById("card-tips").innerHTML = cardTips;
}