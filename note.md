const marker = new mapboxgl.Marker()
    .setLngLat([121.5654, 25.034])
    .addTo(map);
    marker.getElement().style.cursor = 'pointer'; // 設定游標為 pointer
    marker.getElement().style.backgroundColor = '#fff'; // 設定背景色
    marker.getElement().style.padding = '5px'; // 設定內邊距
    marker.getElement().style.borderRadius = '5px'; // 設定圓角
    marker.getElement().style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)'; // 設定陰影效果
    marker.getElement().innerHTML = `<strong>test</strong>`;