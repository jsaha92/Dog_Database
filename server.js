const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL Database Connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Fireboy2@',
  database: 'dog',
  //insecureAuth: true,
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});


app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="style.css">
      <title>Dog Database App</title>
    </head>
    <body>
      <h1>Welcome to the Dog Database App</h1>
      <ul>
        <li><a href="/vets">Vets</a></li>
        <li><a href="/event">Events</a></li>
        <li><a href="/pets">Pets</a></li>
      </ul>
      <script src="app.js"></script>
    </body>
    </html>
  `);
});


  app.get('/vets', (req, res) => {
    const query = 'SELECT * FROM vets'; // Modify this query as needed
    db.query(query, (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('<p>Error: Internal Server Error</p>');
      } else {
        // Assuming the query returns an array of rows
        const formattedData = formatDataVet(result);
        res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="style.css">
            <title>Dog Database App</title>
          </head>
          <body>
            <h1>Data from MySQL Database</h1>
            <div id="data-container">
              ${formattedData}
            </div>
            <script src="app.js"></script>
          </body>
          </html>
        `);
      }
    });
  });

  app.get('/event', (req, res) => {
    const query = 'SELECT * FROM events'; // Modify this query as needed
    db.query(query, (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('<p>Error: Internal Server Error</p>');
      } else {
        // Assuming the query returns an array of rows
        const formattedData = formatData(result);
        res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="style.css">
            <title>Dog Database App</title>
          </head>
          <body>
            <h1>Data from MySQL Database</h1>
            <div id="data-container">
              ${formattedData}
            </div>
            <script src="app.js"></script>
          </body>
          </html>
        `);
      }
    });
  });
  


app.get('/pets', (req, res) => {
  const selectedSize = req.query.size || 'All';

  let query;
  if (selectedSize === 'All') {
      query = 'SELECT * FROM pets';
  } else {
      query = `SELECT * FROM pets WHERE size = '${selectedSize}'`;
  }

  db.query(query, (err, result) => {
      if (err) {
          console.error('MySQL query error:', err);
          res.status(500).send('<p>Error: Internal Server Error</p>');
      } else {
          const formattedData = formatDataPet(result);
          const dropdownOptions = ['All', 'Small', 'Medium', 'Large', 'Extra Large'];
          
          res.send(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <link rel="stylesheet" href="style.css">
                  <title>Dog Database App</title>
              </head>
              <body>
                  <h1>Data from MySQL Database</h1>

                  <label for="petFilter">Filter by Pet Size:</label>
                  <select id="petFilter" onchange="filterData()">
                      ${dropdownOptions.map(option => `<option value="${option}" ${option === selectedSize ? 'selected' : ''}>${option}</option>`).join('')}
                  </select>

                  <div id="data-container">
                      ${formattedData}
                  </div>
                  <script src="app.js"></script>
                  <script>
                      function filterData() {
                          const selectedSize = document.getElementById('petFilter').value;
                          window.location.href = '/pets?size=' + selectedSize;
                      }
                  </script>
              </body>
              </html>
          `);
      }
  });
});


  function formatData(data) {
    let tableHtml = '<table>';
    tableHtml += '<tr><th>Event_ID</th><th>Event_Name</th><th>Event_Date</th><th>Shelter_Hosting</th></tr>';
  
    data.forEach(row => {
      tableHtml += `<tr><td>${row.Event_ID}</td><td>${row.Event_Name}</td><td>${row.Event_Date}</td><td>${row.Shelter_Hosting}</td></tr>`;
    });
  
    tableHtml += '</table>';
    return tableHtml;
  }

  function formatDataVet(data) {
    let tableHtml = '<table>';
    tableHtml += '<tr><th>Vet_ID</th><th>Vet_Name</th><th>Address</th><th>Phone</th><th>Website</th></tr>';
  
    data.forEach(row => {
      tableHtml += `<tr><td>${row.Vet_ID}</td><td>${row.Vet_Name}</td><td>${row.Address}</td><td>${row.Phone}</td><td>${row.Website}</td></tr>`;
    });
  
    tableHtml += '</table>';
    return tableHtml;
  }
  
  function formatDataPet(data) {
    let tableHtml = '<table>';
    tableHtml += '<tr><th>Pet_ID</th><th>Name</th><th>Breed</th><th>Color</th><th>Age</th><th>Size</th><th>Gender</th><th>Weight</th><th>Shelter_ID</th></tr>';
  
    data.forEach(row => {
      tableHtml += `<tr><td>${row.Pet_ID}</td><td>${row.Name}</td><td>${row.Breed}</td><td>${row.Color}</td><td>${row.Age}</td><td>${row.Size}</td><td>${row.Gender}</td><td>${row.Weight}</td><td>${row.Shelter_ID}</td></tr>`;
    });
  
    tableHtml += '</table>';
    return tableHtml;
  }
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});