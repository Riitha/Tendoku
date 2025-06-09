//menambahkan format date
function formatDate(date) {
    return new Date(date).toLocaleDateString("ja-JP", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
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
	console.log(tenkiData)	
}
getWeather()