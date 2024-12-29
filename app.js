const fileInput = document.getElementById('file-input');
const fileName = document.getElementById('file-name');

fileInput.addEventListener('change', (e)=> {
  const file = e.target.files[0];
  if (!file) {
      fileName.textContent = 'No file chosen';
      return;
  }

  fileName.textContent = file.name; //change text to file name 

//reading file and parse it 
  const reader = new FileReader();
  reader.onload = function(e) {
      const text = e.target.result;
      const data = parseCSV(text);
      displayData(data);
  };
  reader.readAsText(file); //convert it into text
  });

function parseCSV(text) {
    const lines = text.split('\n');
    return lines.map(line => line.split(',').map(cell => cell.trim()));
}

function displayData(data) {
    if (data.length === 0) {
        document.getElementById('table-container').innerHTML = 
            '<div class="message">No data found in the file</div>';
        return;
    }

    let tableHTML = '<table>';
    
    // Headers
    tableHTML += '<tr>';
    data[0].forEach(header => {
        tableHTML += `<th>${header}</th>`;
    });
    tableHTML += '</tr>';

    // Data rows
    for (let i = 1; i < data.length; i++) {
        if (data[i].length === 1 && data[i][0] === '') continue;
        tableHTML += '<tr>';
        data[i].forEach(cell => {
            tableHTML += `<td>${cell}</td>`;
        });
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    document.getElementById('table-container').innerHTML = tableHTML;
}