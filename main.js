//menambahkan format date
function formatDate(date) {
    return new Date(date).toLocaleDateString("ja-JP", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
}
//async await
const url = "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&daily=weather_code,temperature_2m_min&timezone=Asia%2FTokyo"

async function fetchingData() {
    try {
        const res = await fetch(url);
        const forecast = await res.json();
        const container = document.getElementById("card-container")

        for (let i = 0; i < forecast.daily.time.length; i++) {
            const tanggal = formatDate(forecast.daily.time[i]);
            const suhu = forecast.daily.temperature_2m_min[i];

            const card=`
            <li><p>${tanggal}</p><p>最低:${suhu}</p></li>`;

            container.innerHTML += card;
        }
    } catch(error) {
        console.error("data tidak ditemukan", error)
    }
}
fetchingData();