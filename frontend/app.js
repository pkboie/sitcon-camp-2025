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
    img: "https://oneforty.s3.ap-northeast-3.amazonaws.com/s3/quill/20220221-5gyB6RuRHaxbg6CT61VsIK9IjzSlWzB0UTVGTSwH.jpg",
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
taipeiSpots.forEach((spot) => {
  const marker = new mapboxgl.Marker()
    .setLngLat(spot.coord)
    .addTo(map);
    marker.getElement().style.cursor = 'pointer'; // 設定游標為 pointer
    marker.getElement().style.backgroundColor = '#fff'; // 設定背景色
    marker.getElement().style.padding = '5px'; // 設定內邊距
    marker.getElement().style.borderRadius = '5px'; // 設定圓角
    marker.getElement().style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)'; // 設定陰影效果
    marker.getElement().innerHTML = `<strong>${spot.name}</strong>`;
    // 點擊 Marker 顯示景點資訊

    marker.getElement().addEventListener('click', () => {
      showSpotInfo(spot);
    });
    marker.getElement().addEventListener('mouseover', () => {
        marker.getElement().style.backgroundColor = '#e0e0e0'; // 滑鼠移入變色
        });
    marker.getElement().addEventListener('mouseout', () => {
        marker.getElement().style.backgroundColor = '#fff'; // 滑鼠移出變回原色
    });
    
  });

// 顯示景點資訊（點 Marker 呼叫）
function showSpotInfo(spot) {
  const noteList = document.getElementById('note-list');

  const tempNote = document.createElement('div');
  tempNote.style.border = '1px solid #ccc';
  tempNote.style.padding = '5px';
  tempNote.style.marginBottom = '10px';
  tempNote.style.backgroundColor = '#f9f9f9';

  // 標題
  const title = document.createElement('h3');
  title.textContent = spot.name;
  tempNote.appendChild(title);

  // 圖片
  const img = document.createElement('img');
  img.src = spot.img;
  img.alt = spot.name;
  img.style.width = '100%';
  img.style.display = 'block';
  tempNote.appendChild(img);

  // 官網連結
  const linkP = document.createElement('p');
  const link = document.createElement('a');
  link.href = spot.url;
  link.target = "_blank";
  link.textContent = "官網";
  linkP.appendChild(link);
  tempNote.appendChild(linkP);

  // 儲存到旅遊手冊按鈕
  const saveBtn = document.createElement('button');
  saveBtn.textContent = '加入旅遊手冊';
  saveBtn.style.marginTop = '10px';
  saveBtn.addEventListener('click', () => {
    addToHandbook(spot);
  });
  tempNote.appendChild(saveBtn);

  noteList.appendChild(tempNote);
}

// 將景點加入旅遊手冊（正式筆記區）
function addToHandbook(spot) {
  const noteList = document.getElementById('note-list');

  const note = document.createElement('div');
  note.style.border = '1px solid #ccc';
  note.style.padding = '5px';
  note.style.marginBottom = '10px';
  note.style.backgroundColor = '#ffffff';

  // 標題
  const title = document.createElement('h4');
  title.textContent = spot.name;
  note.appendChild(title);

  // 圖片
  const img = document.createElement('img');
  img.src = spot.img;
  img.alt = spot.name;
  img.style.width = '100%';
  img.style.display = 'block';
  note.appendChild(img);

  // 官網連結
  const linkP = document.createElement('p');
  const link = document.createElement('a');
  link.href = spot.url;
  link.target = "_blank";
  link.textContent = "官網";
  linkP.appendChild(link);
  note.appendChild(linkP);

  // 旅遊筆記 textarea
  const textarea = document.createElement('textarea');
  textarea.placeholder = "旅遊筆記...";
  textarea.style.width = '100%';
  textarea.style.marginTop = '5px';
  note.appendChild(textarea);

  // 儲存到後端按鈕
  const backendBtn = document.createElement('button');
  backendBtn.textContent = "儲存到資料庫";
  backendBtn.style.marginTop = '5px';
  backendBtn.addEventListener('click', () => {
    saveSpotToBackend(spot, textarea.value);
  });
  note.appendChild(backendBtn);

  // 刪除按鈕
  const delBtn = document.createElement('button');
  delBtn.textContent = "刪除";
  delBtn.style.marginTop = '5px';
  delBtn.addEventListener('click', () => {
    note.remove();
  });
  note.appendChild(delBtn);

  noteList.appendChild(note);
}


// 呼叫後端儲存 API
function saveSpotToBackend(spot, noteText) {
  fetch('http://127.0.0.1:8000/spots/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: spot.name,
      img: spot.img,
      url: spot.url,
      note: noteText
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("已儲存至後端", data);
  });
}
