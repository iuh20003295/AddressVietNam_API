const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors()); 
// Import dữ liệu từ file JSON
const data = require('./data.json');
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Chọn thông tin</title>
      </head>
      <body>
        <h1>Chọn thông tin muốn xem:</h1>
        <button onclick="window.location.href='/provinces'">Provinces</button>
        <button onclick="window.location.href='/districts/45'">Districts (Province 45)</button>
        <button onclick="window.location.href='/communes/461'">Communes (District 461)</button>
      </body>
    </html>
  `);
});
// API lấy danh sách tỉnh
app.get('/provinces', (req, res) => {
  res.json(data.province);
});

// API lấy danh sách quận/huyện theo idProvince
app.get('/districts/:idProvince', (req, res) => {
  const { idProvince } = req.params;
  const districts = data.district.filter(d => d.idProvince === idProvince);
  
  if (districts.length > 0) {
    res.json(districts);
  } else {
    res.status(404).json({ error: 'Không tìm thấy quận/huyện cho tỉnh này.' });
  }
});

// API lấy danh sách xã/phường theo idDistrict
app.get('/communes/:idDistrict', (req, res) => {
  const { idDistrict } = req.params;
  const communes = data.commune.filter(c => c.idDistrict === idDistrict);

  if (communes.length > 0) {
    res.json(communes);
  } else {
    res.status(404).json({ error: 'Không tìm thấy xã/phường cho quận/huyện này.' });
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

module.exports = app;
