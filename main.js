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
//search
async function getWeather() {
	const city = document.getElementById('search-input').value;
	if(!city) {
		alert('お住まいを入力してください');
		return;
	}
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
	//empty list
	container.innerHTML = "";
	//loop list
	for (let i = 0; i < tenkiData.daily.time.length; i++) {
		const { hari, tanggal} = formatDate(tenkiData.daily.time[i]);
		const suhu = tenkiData.daily.temperature_2m_max[i];
		const kodeCuaca = tenkiData.daily.weather_code[i];

		const card = `
		<li>
			<p>${ hari }</p>
			<p>${ tanggal }</p>
			<p>最高: ${suhu}</p>
			<p>${kodeCuaca}</p>
		</li>`;
		container.innerHTML += card;
	}
}