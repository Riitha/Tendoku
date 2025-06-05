//menambahkan format date
function formatDate(date) {
    return new Date(date).toLocaleDateString("ja-JP", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
}
let hasil = formatDate("2025-06-05")
console.log(hasil);