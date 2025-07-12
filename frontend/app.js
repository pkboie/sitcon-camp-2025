mapboxgl.accessToken = 'pk.eyJ1IjoicGtib2llIiwiYSI6ImNtYXdxd2ljMjBrbDYybW9zc2JwZGg3bDYifQ.IO-4KpCrTxc-uVF1wIA6mw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [121.5654, 25.0330], // 台北101
  zoom: 10
});

// 景點資料
const taipeiSpots = [
  {
    name: "台北車站",
    coord: [121.5170, 25.0478],
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Taipei_Station_2018.jpg/320px-Taipei_Station_2018.jpg",
    url: "https://www.railway.gov.tw/tra-tip-web/tip"
  },
  {
    name: "龍山寺",
    coord: [121.4997, 25.0375],
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Lungshan_Temple_Taipei.jpg/320px-Lungshan_Temple_Taipei.jpg",
    url: "https://www.lungshan.org.tw/"
  },
  {
    name: "台北101",
    coord: [121.5645, 25.0330],
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Taipei_101_2019.jpg/320px-Taipei_101_2019.jpg",
    url: "https://www.taipei-101.com.tw/"
  }
];

// 新增 Marker
taipeiSpots.forEach(s => {
  const marker = new mapboxgl.Marker()
    .setLngLat(s.coord)
    .addTo(map);

  marker.getElement().addEventListener('click', () => {
    showSpotInfo(s);
  });
});

// 顯示景點資訊
function showSpotInfo(spot) {
  const info = document.createElement('div');
  info.innerHTML = `
    <h3>${spot.name}</h3>
    <img src="${spot.img}" width="100%">
    <p><a href="${spot.url}" target="_blank">官網</a></p>
    <button onclick='saveSpot(${JSON.stringify(JSON.stringify(spot))})'>儲存</button>
  `;
  new mapboxgl.Popup()
    .setLngLat(spot.coord)
    .setDOMContent(info)
    .addTo(map);
}

// 儲存景點
function saveSpot(spotStr) {
  const spot = JSON.parse(spotStr);
  const noteList = document.getElementById('note-list');

  const note = document.createElement('div');
  note.innerHTML = `
    <h4>${spot.name}</h4>
    <img src="${spot.img}" width="100%">
    <p><a href="${spot.url}" target="_blank">官網</a></p>
    <textarea placeholder="旅遊筆記..."></textarea>
    <button onclick="this.parentElement.remove()">刪除</button>
  `;
  noteList.appendChild(note);
}
