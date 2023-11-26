document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
  try {
    const response = await fetch('/data');
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayData(data) {
  const container = document.getElementById('data-container');
  container.innerHTML = '<h2>Data:</h2>';
  
  if (data.length === 0) {
    container.innerHTML += '<p>No data available.</p>';
    return;
  }

  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <!-- Add more columns based on your table structure -->
      </tr>
    </thead>
    <tbody>
      ${data.map(row => `
        <tr>
          <td>${row.id}</td>
          <td>${row.name}</td>
          <!-- Add more cells based on your table structure -->
        </tr>
      `).join('')}
    </tbody>
  `;
  
  container.appendChild(table);
}
