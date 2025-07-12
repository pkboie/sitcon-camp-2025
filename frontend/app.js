mapboxgl.accessToken = 'pk.eyJ1IjoicGtib2llIiwiYSI6ImNtY3pqbDFuZDB6MDAybXF0eWplcXp0ajkifQ.gzOE8eUxEDY87RRJEExq2A';

var cityLocaction = [121.5654, 25.0330]

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [121.5654, 25.0330], // 台北101
  zoom: 10
});

window.onload = () => {
  fetch('http://127.0.0.1:8000/spots/')
    .then(res => res.json())
    .then(data => {
      data.forEach(spot => {
        addToHandbook(spot);
      });
    });
};

const cityCenters = {
  Taipei: [121.5654, 25.0330],      // 台北市
  NewTaipei: [121.4628, 25.0129],   // 新北市
  Taoyuan: [121.3010, 24.9947],     // 桃園市
  Hsinchu: [120.9647, 24.8039],     // 新竹市
  Miaoli: [120.8184, 24.5602],      // 苗栗縣
  Taichung: [120.6736, 24.1477],    // 台中市
  Changhua: [120.4818, 24.0667],    // 彰化縣
  Nantou: [120.9876, 23.8388],      // 南投縣
  Yunlin: [120.4313, 23.7559],      // 雲林縣
  Chiayi: [120.4473, 23.4754],      // 嘉義市
  Tainan: [120.2130, 22.9908],      // 台南市
  Kaohsiung: [120.3014, 22.6273],   // 高雄市
  Pingtung: [120.4880, 22.5519],    // 屏東縣
  Yilan: [121.7540, 24.7021],       // 宜蘭縣
  Hualien: [121.6044, 23.9911],     // 花蓮縣
  Taitung: [121.1132, 22.7564],     // 台東縣
  Penghu: [119.6151, 23.5655],      // 澎湖縣
  Keelung: [121.7081, 25.1089],     // 基隆市
  Kinmen: [118.3171, 24.4321],      // 金門縣
  Matsu: [119.9394, 26.1608]        // 連江縣 (馬祖)
};


document.getElementById('citySelect').addEventListener('change', function () {
  const city = this.value;
  const center = cityCenters[city];
  cityLocaction = center; // 更新全域變數 cityLocaction
  if (center) {
    map.flyTo({
      center: center,
      zoom: 10
    });
  }
});

// 景點資料
const taipeiSpots = [
  {
    name: "台北車站",
    coord: [121.5170, 25.0478],
    img: "data:image/jpeg;base64,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",
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
//taipeiSpots.forEach((spot) => {
//  const marker = new mapboxgl.Marker()
//    .setLngLat(spot.coord)
//    .addTo(map);
//    marker.getElement().style.cursor = 'pointer'; // 設定游標為 pointer
//    marker.getElement().style.backgroundColor = '#fff'; // 設定背景色
//    marker.getElement().style.padding = '5px'; // 設定內邊距
//    marker.getElement().style.borderRadius = '5px'; // 設定圓角
//    marker.getElement().style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)'; // 設定陰影效果
//    marker.getElement().innerHTML = `<strong>${spot.name}</strong>`;
//    // 點擊 Marker 顯示景點資訊
//
//    marker.getElement().addEventListener('click', () => {
//      showSpotInfo(spot);
//    });
//    marker.getElement().addEventListener('mouseover', () => {
//        marker.getElement().style.backgroundColor = '#e0e0e0'; // 滑鼠移入變色
//        });
//    marker.getElement().addEventListener('mouseout', () => {
//        marker.getElement().style.backgroundColor = '#fff'; // 滑鼠移出變回原色
//    });
//    
//  });

function showSpotInfo(spot) {
  const tempSpot = document.getElementById('temp-spot');

  // 清空暫存顯示區
  tempSpot.innerHTML = '';

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
  //const linkP = document.createElement('p');
  //const link = document.createElement('a');
  //link.href = spot.url;
  //link.target = "_blank";
  //link.textContent = "官網";
  //linkP.appendChild(link);
  //tempNote.appendChild(linkP);

  // 儲存到旅遊手冊按鈕
  const saveBtn = document.createElement('button');
  saveBtn.textContent = '加入旅遊手冊';
  saveBtn.style.marginTop = '10px';
  saveBtn.addEventListener('click', () => {
    addToHandbook(spot);
  });
  tempNote.appendChild(saveBtn);

  tempSpot.appendChild(tempNote);


    const container = document.createElement('div');
    container.className = 'card p-2 bg-light';
}

function addToHandbook(spot) {
  const handbook = document.getElementById('handbook');

  const note = document.createElement('div');
  note.className = 'card p-2';

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

  // 旅遊筆記 textarea
  const textarea = document.createElement('textarea');
  textarea.placeholder = "旅遊筆記...";
  textarea.style.width = '100%';
  textarea.style.marginTop = '5px';
  note.appendChild(textarea);

  // 刪除按鈕
  const delBtn = document.createElement('button');
  delBtn.textContent = "刪除";
  delBtn.style.marginTop = '5px';
  delBtn.className = 'btn btn-danger btn-sm'; // Add Bootstrap class for styling

  // Create and store the marker
  const marker = new mapboxgl.Marker()
    .setLngLat(spot.address) // Use spot.address for coordinates
    .addTo(map);

  // Add event listener to remove both the note and the marker
  delBtn.addEventListener('click', () => {
    marker.remove(); // Remove the marker from the map
    note.remove(); // Remove the handbook entry
    // You might also want to remove the spot from the backend here if needed
    // For example: deleteSpotFromBackend(spot.id);
  });
  note.appendChild(delBtn);

  handbook.appendChild(note);

  textarea.addEventListener('change', () => {
    saveSpotToBackend(spot, textarea.value); // 即時儲存筆記
  });

  // Optional: Add marker styling and event listeners if desired
  // marker.getElement().style.cursor = 'pointer';
  // marker.getElement().style.backgroundColor = '#fff';
  // marker.getElement().style.padding = '5px';
  // marker.getElement().style.borderRadius = '5px';
  // marker.getElement().style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
  // marker.getElement().innerHTML = `<strong>${spot.name}</strong>`;
  // marker.getElement().addEventListener('click', () => { showSpotInfo(spot); });
  // marker.getElement().addEventListener('mouseover', () => { marker.getElement().style.backgroundColor = '#e0e0e0'; });
  // marker.getElement().addEventListener('mouseout', () => { marker.getElement().style.backgroundColor = '#fff'; });
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

// ====== PDF 生成，支援中文
document.getElementById('generate-pdf').addEventListener('click', async () => {
  const pdf = new window.jspdf.jsPDF();
  pdf.setFont("NotoSansCJKsc"); // ⭐️ 使用中文字型

  const handbook = document.getElementById('handbook');
  const entries = handbook.querySelectorAll('.card');

  if (entries.length === 0) {
    alert('旅遊手冊尚未加入任何景點！');
    return;
  }

  pdf.setFontSize(24);
  pdf.setTextColor(40, 40, 90);
  pdf.text("我的旅遊小冊", 105, 80, { align: 'center' });

  pdf.setFontSize(14);
  pdf.setTextColor(80);
  pdf.text("探索旅程・書寫回憶", 105, 95, { align: 'center' });

  const today = new Date().toLocaleDateString();
  pdf.setFontSize(10);
  pdf.setTextColor(100);
  pdf.text(`製作日期：${today}`, 105, 110, { align: 'center' });

  pdf.addPage();

  for (const entry of entries) {
    const title = entry.querySelector('h4')?.textContent || '';
    const imgEl = entry.querySelector('img');
    const url = entry.querySelector('a')?.href || '';
    const note = entry.querySelector('textarea')?.value || '';

    pdf.setFontSize(18);
    pdf.setTextColor(30, 30, 100);
    pdf.text(title, 20, 30);

    if (imgEl && imgEl.src) {
      try {
        const imgData = await toDataURL(imgEl.src);
        pdf.addImage(imgData, 'JPEG', 40, 40, 130, 80);
      } catch (e) {
        pdf.setFontSize(10);
        pdf.text('(圖片載入失敗)', 20, 50);
      }
    }

    pdf.setFontSize(11);
    pdf.setTextColor(0, 102, 204);
    pdf.textWithLink("官方網站", 20, 130, { url });

    if (note) {
      pdf.setFontSize(12);
      pdf.setTextColor(50);
      const noteLines = pdf.splitTextToSize(`筆記：${note}`, 170);
      pdf.text(noteLines, 20, 145);
    }

    pdf.addPage();
  }

  pdf.save("旅遊小冊.pdf");
});

// ====== 工具函數：圖片轉 base64
async function toDataURL(url) {
  return fetch(url)
    .then(res => res.blob())
    .then(blob => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    }));
}
document.querySelector('#search').addEventListener('click', () => {
  console.log('Search button clicked');

  $.ajax({
    url: 'http://127.0.0.1:8000/search', // The URL to send the request to
    method: 'GET', // Specify the HTTP method as GET
    dataType: 'json', // Expected data type from the server (e.g., 'json', 'xml', 'html', 'text')
    data: { // Optional: Data to send with the request (will be appended to the URL as query parameters)
      "keyword": document.querySelector("#keyword").value,
      "loc": [cityLocaction[1], cityLocaction[0]].join(',')
    },
    success: function(response) {
      // This function is executed if the request is successful
      console.log('Success:', response);
      // Process the received data here
      const tempSpot = document.getElementById('temp-spot');
      tempSpot.innerHTML = ''; // Clear previous results

      if (response && response.length > 0) {
        response.forEach(spot => {
          const spotElement = document.createElement('div');
          spotElement.className = 'card p-2 mb-2'; // Use card class for styling

          const title = document.createElement('h5'); // Use h5 for search results
          title.textContent = spot.name;
          spotElement.appendChild(title);

          if (spot.photo) {
            const img = document.createElement('img');
            // Assuming the photo path is relative to the backend URL
            img.src = `http://127.0.0.1:8000${spot.photo}`;
            img.alt = spot.name;
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            img.style.marginBottom = '10px';
            spotElement.appendChild(img);
          }

          // Add button to add to handbook
          const saveBtn = document.createElement('button');
          saveBtn.textContent = '加入旅遊手冊';
          saveBtn.className = 'btn btn-success btn-sm'; // Bootstrap button classes
          saveBtn.addEventListener('click', () => {
            // Create a spot object compatible with addToHandbook
            const handbookSpot = {
              name: spot.name,
              img: spot.photo ? `http://127.0.0.1:8000${spot.photo}` : '', // Use full URL for handbook
              url: spot.url || '', // Assuming url might be in the response or empty
              address: spot.address
            };
            addToHandbook(handbookSpot);
          });
          spotElement.appendChild(saveBtn);

          tempSpot.appendChild(spotElement);
        });
      } else {
        tempSpot.innerHTML = '<p>找不到相關景點。</p>';
      }
    },
    error: function(xhr, status, error) {
      // This function is executed if the request fails
      console.error('Error:', status, error);
      const tempSpot = document.getElementById('temp-spot');
      tempSpot.innerHTML = '<p>搜尋失敗，請稍後再試。</p>';
    }
  });
})
