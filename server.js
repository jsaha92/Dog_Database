const express = require('express');
const mysql = require('mysql');


const app = express();
const port = 3000;


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

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));


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
        <li><a href="/shelters">Shelters</a></li>
        <li><a href="/owners">Owners</a></li>
      </ul>
      <script src="app.js"></script>
    </body>
    </html>
  `);
});


  app.get('/vets', (req, res) => {
    const query = 'SELECT * FROM vets'; 
    db.query(query, (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('<p>Error: Internal Server Error</p>');
      } else {
        
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
            <h1>Rescue Dog Database</h1>
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
    const query = 'SELECT * FROM events'; 
    db.query(query, (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('<p>Error: Internal Server Error</p>');
      } else {
        
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
            <h1>Rescue Dog Database</h1>
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
                  <h1>Rescue Dog Database</h1>

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


app.get('/owners', (req, res) => {
  const query = 'SELECT * FROM owners';
  db.query(query, (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('<p>Error: Internal Server Error</p>');
    } else {
      const formattedData = formatDataOwner(result);
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
          <h1>Rescue Dog Database</h1>
          <div id="data-container">
            ${formattedData}
          </div>
          <form id="ownerForm" action="/owners" method="post">
  <label for="owner_ID">Owner ID:</label>
  <input type="text" id="owner_ID" name="owner_ID" required>

  <label for="firstName">First Name:</label>
  <input type="text" id="firstName" name="firstName" required>

  <label for="lastName">Last Name:</label>
  <input type="text" id="lastName" name="lastName" required>

  <label for="age">Age:</label>
  <input type="number" id="age" name="age" required>

  <label for="hadPreviousDog">Had Previous Dog:</label>
  <select id="hadPreviousDog" name="hadPreviousDog" required>
    <option value="1">Yes</option>
    <option value="0">No</option>
  </select>

  <label for="homeSize">Home Size:</label>
  <input type="text" id="homeSize" name="homeSize" required>

  <label for="nearestShelter">Nearest Shelter:</label>
  <input type="text" id="nearestShelter" name="nearestShelter" required>

  <button type="submit">Add Owner</button>
</form>

          <script src="app.js"></script>
        </body>
        </html>
      `);
    }
  });
});




app.post('/owners', (req, res) => {
  const {
    owner_ID,
    firstName,
    lastName,
    age,
    hadPreviousDog,
    homeSize,
    nearestShelter
  } = req.body;

  const insertQuery = `
    INSERT INTO owners (Owner_ID,First_Name, Last_Name, Age, Had_Previous_Dog, Home_Size, Nearest_Shelter) 
    VALUES (?,?, ?, ?, ?, ?, ?)
  `;

  const values = [owner_ID, firstName, lastName, age, hadPreviousDog, homeSize, nearestShelter];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('<p>Error: Internal Server Error</p>');
    } else {
      
      res.redirect('/owners');
    }
  });
});



app.get('/shelters', (req, res) => {
  const query = 'SELECT * FROM shelters'; 
  db.query(query, (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('<p>Error: Internal Server Error</p>');
    } else {
      
      const formattedData = formatDataShelter(result);
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
          <h1>Rescue Dog Database</h1>
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




app.post('/owners', (req, res) => {
  const {
    firstName,
    lastName,
    age,
    hadPreviousDog,
    homeSize,
    nearestShelter
  } = req.body;

  const insertQuery = `
    INSERT INTO owners (First_Name, Last_Name, Age, Had_Previous_Dog, Home_Size, Nearest_Shelter) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [firstName, lastName, age, hadPreviousDog, homeSize, nearestShelter];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('<p>Error: Internal Server Error</p>');
    } else {
      
      res.redirect('/owners');
    }
  });
});


  function formatData(data) {
    let tableHtml = '<table>';
    tableHtml += '<tr><th>Event_ID</th><th>Event_Name</th><th>Event_Date</th></tr>';
  
    data.forEach(row => {
      
      tableHtml += `<tr><td>${row.Event_ID}</td><td>${row.Event_Name}</td><td>${new Date(row.Event_Date).toLocaleDateString()}</td></tr>`;

    });
  
    tableHtml += '</table>';
    return tableHtml;
  }

  function formatDataVet(data) {
    let tableHtml = '<table>';
    tableHtml += '<tr><th>Vet_Name</th><th>Address</th><th>Phone</th><th>Website</th></tr>';
  
    data.forEach(row => {
      tableHtml += `<tr><td>${row.Vet_Name}</td><td>${row.Address}</td><td>${row.Phone}</td><td>${row.Website}</td></tr>`;
    });
  
    tableHtml += '</table>';
    return tableHtml;
  }
  
  function formatDataPet(data) {
    let tableHtml = '<table>';
    tableHtml += '<tr><th>Name</th><th>Breed</th><th>Color</th><th>Age</th><th>Size</th><th>Gender</th><th>Weight</th><th>Shelter_ID</th></tr>';
  
    data.forEach(row => {
      tableHtml += `<tr><td>${row.Name}</td><td>${row.Breed}</td><td>${row.Color}</td><td>${row.Age}</td><td>${row.Size}</td><td>${row.Gender}</td><td>${row.Weight}</td><td>${row.Shelter_ID}</td></tr>`;
    });
  
    tableHtml += '</table>';
    return tableHtml;
  }


  function formatDataOwner(data) {
    let tableHtml = '<table>';
    tableHtml += '<tr><th>Owner ID</th><th>First Name</th><th>Last Name</th><th>Age</th><th>Had Dog Before</th><th>Home Size</th><th>Nearest Shelter</th></tr>';
  
    data.forEach(row => {
      tableHtml += `<tr><td>${row.owner_ID}</td><td>${row.First_Name}</td><td>${row.Last_Name}</td><td>${row.Age}</td><td>${row.Had_Previous_Dog}</td><td>${row.Home_Size}</td><td>${row.Nearest_Shelter}</td></tr>`;
    });
  
    tableHtml += '</table>';
    return tableHtml;
  }

  function formatDataShelter(data) {
    let tableHtml = '<table>';
    tableHtml += '<tr><th>Shelter ID</th><th>Shelter Name</th><th>Location</th><th>Website</th></tr>';
  
    data.forEach(row => {
      tableHtml += `<tr><td>${row.Shelter_ID}</td><td>${row.Shelter}</td><td>${row.Location}</td><td>${row.Website}</td></tr>`;
    });
  
    tableHtml += '</table>';
    return tableHtml;
  }
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});