mapboxgl.accessToken = 'pk.eyJ1IjoicGtib2llIiwiYSI6ImNtY3pqbDFuZDB6MDAybXF0eWplcXp0ajkifQ.gzOE8eUxEDY87RRJEExq2A';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [121.5654, 25.0330], // 台北101
  zoom: 10
});

let markers = [];

function updateMarkers(spots) {
  markers.forEach(marker => marker.remove());
  markers = [];

  spots.forEach(spot => {
    const marker = new mapboxgl.Marker({ color: '#0077b6' })
      .setLngLat(spot.coord)
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${spot.name}</h3>`))
      .addTo(map);

    marker.getElement().addEventListener('click', () => {
      showSpotInfo(spot);
    });

    markers.push(marker);
  });
}

const taiwanCities = [
  { name: '台北市', coord: [121.5654, 25.0330], zoom: 10 },
  { name: '新北市', coord: [121.4628, 25.0129], zoom: 9 },
  { name: '桃園市', coord: [121.3010, 24.9947], zoom: 9 },
  { name: '台中市', coord: [120.6790, 24.1370], zoom: 9 },
  { name: '台南市', coord: [120.2130, 22.9908], zoom: 9 },
  { name: '高雄市', coord: [120.3014, 22.6273], zoom: 9 }
];

const taipeiSpots = [
  {
    name: "台北車站",
    coord: [121.5170, 25.0478],
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Taipei_Station_at_night.jpg/320px-Taipei_Station_at_night.jpg",
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

// 城市按鈕
const cityButtons = document.getElementById('city-buttons');
taiwanCities.forEach(city => {
  const btn = document.createElement('button');
  btn.textContent = city.name;
  btn.addEventListener('click', () => {
    map.flyTo({ center: city.coord, zoom: city.zoom });
  });
  btn.addEventListener('mouseover', () => {
    btn.style.backgroundColor = '#495057';
  });
  btn.addEventListener('mouseout', () => {
    btn.style.backgroundColor = '#6c757d';
  });
  cityButtons.appendChild(btn);
});

updateMarkers(taipeiSpots);

// 顯示景點資訊
function showSpotInfo(spot) {
  const tempSpot = document.getElementById('temp-spot');
  tempSpot.innerHTML = `
    <h3>${spot.name}</h3>
    <img src="${spot.img}" alt="${spot.name}">
    <p><a href="${spot.url}" target="_blank">官網</a></p>
    <button class="btn btn-primary add-to-handbook">加入旅遊手冊</button>
  `;
  tempSpot.querySelector('.add-to-handbook').addEventListener('click', () => {
    addToHandbook(spot);
  });
}

// 載入旅遊手冊
async function loadHandbook() {
  try {
    const response = await fetch('http://127.0.0.1:8000/spots/');
    if (!response.ok) throw new Error('無法載入手冊');
    const spots = await response.json();
    spots.forEach(spot => addToHandbook(spot, false));
  } catch (error) {
    console.error('載入手冊失敗:', error);
  }
}

// 檢查景點是否已存在（避免重複）
function isSpotInHandbook(name) {
  return [...document.querySelectorAll('#handbook h4')].some(h4 => h4.textContent === name);
}

// 加入旅遊手冊
async function addToHandbook(spot, saveToBackend = true) {
  if (isSpotInHandbook(spot.name)) return;

  const handbook = document.getElementById('handbook');
  const note = document.createElement('div');
  note.className = 'card p-2';
  note.setAttribute('data-spot', spot.name); // 用於識別

  note.innerHTML = `
    <h4>${spot.name}</h4>
    <img src="${spot.img}" alt="${spot.name}">
    <p><a href="${spot.url}" target="_blank">官網</a></p>
    <textarea placeholder="旅遊筆記...">${spot.note || ''}</textarea>
    <button class="btn btn-danger delete">刪除</button>
  `;

  const textarea = note.querySelector('textarea');
  textarea.addEventListener('change', () => {
    saveSpotToBackend(spot, textarea.value);
  });

  note.querySelector('.delete').addEventListener('click', async () => {
    try {
      await fetch(`http://127.0.0.1:8000/spots/${encodeURIComponent(spot.name)}/`, {
        method: 'DELETE'
      });
      note.remove();

      const response = await fetch('http://127.0.0.1:8000/spots/');
      const updatedSpots = await response.json();
      updateMarkers(updatedSpots);
    } catch (error) {
      console.error('刪除景點失敗:', error);
    }
  });

  handbook.appendChild(note);

  if (saveToBackend) {
    try {
      await saveSpotToBackend(spot, '');
      const response = await fetch('http://127.0.0.1:8000/spots/');
      const updatedSpots = await response.json();
      updateMarkers(updatedSpots);
    } catch (error) {
      console.error('儲存景點失敗:', error);
    }
  }
}

// 儲存到後端
async function saveSpotToBackend(spot, noteText) {
  try {
    const response = await fetch('http://127.0.0.1:8000/spots/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: spot.name,
        img: spot.img,
        url: spot.url,
        note: noteText
      })
    });
    if (!response.ok) throw new Error('儲存失敗');
    console.log('已儲存至後端:', await response.json());
  } catch (error) {
    console.error('儲存景點失敗:', error);
  }
}

// PDF 匯出
document.getElementById('generate-book').addEventListener('click', async () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont('NotoSansTC', 'normal');
  doc.setFontSize(24);
  doc.text("我的台北旅遊手冊", 20, 30);
  doc.setFontSize(14);
  doc.text("作者：旅行愛好者", 20, 40);
  doc.text(`生成日期：${new Date().toLocaleDateString('zh-TW')}`, 20, 50);
  doc.addPage();

  try {
    const mapCanvas = await html2canvas(document.getElementById('map'));
    const mapImg = mapCanvas.toDataURL('image/png');
    doc.addImage(mapImg, 'PNG', 10, 10, 190, 100);
  } catch (error) {
    console.error('地圖截圖失敗:', error);
  }

  const notes = document.querySelectorAll('#handbook > div');
  let y = 120;
  for (const note of notes) {
    try {
      const canvas = await html2canvas(note);
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, y, 190, canvas.height * 190 / canvas.width);
      y += canvas.height * 190 / canvas.width + 10;
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
    } catch (error) {
      console.error('生成景點圖片失敗:', error);
    }
  }

  doc.save('旅遊手冊.pdf');
});

// 初始載入
loadHandbook();
