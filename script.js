function createTable(data) {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    // Define table headers
    const headers = ['Main', 'Type', 'Sub'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    // Populate table with data
    data.forEach(item => {
        const row = document.createElement('tr');

        const mainCell = document.createElement('td');
        mainCell.textContent = item.main;
        mainCell.classList.add('tree');
        mainCell.addEventListener('click', function () {
            row.nextElementSibling.classList.toggle('active');
        });
        row.appendChild(mainCell);

        const typeCell = document.createElement('td');
        typeCell.textContent = item.Type;
        row.appendChild(typeCell);

        const subRow = document.createElement('tr');
        subRow.classList.add('nested');

        const subCell = document.createElement('td');
        const link = document.createElement('a');
        link.href = item.Link;
        link.textContent = item.Sub;
        link.target = "_blank";
        subCell.colSpan = headers.length;
        subCell.appendChild(link);

        const metadataBtn = document.createElement('span');
        metadataBtn.textContent = ' (Metadata)';
        metadataBtn.classList.add('metadata-btn');
        metadataBtn.addEventListener('click', function (event) {
            showPopup(event, item);
        });
        subCell.appendChild(metadataBtn);
        subRow.appendChild(subCell);

        table.appendChild(row);
        table.appendChild(subRow);
    });

    document.getElementById('data-table').appendChild(table);
}

// Function to show metadata pop-up
function showPopup(event, item) {
    event.stopPropagation();
    const popup = document.getElementById('metadata-popup');
    let content = '';
    for (let key in item) {
        if (key !== 'main' && key !== 'Type' && key !== 'Sub' && key !== 'Link') {
            content += `<strong>${key}</strong>: ${item[key]}<br>`;
        }
    }
    popup.innerHTML = content;
    popup.style.left = event.pageX + 'px';
    popup.style.top = event.pageY + 'px';
    popup.classList.add('active');
}

// Hide popup when clicking outside
document.addEventListener('click', function(event) {
    const popup = document.getElementById('metadata-popup');
    if (!event.target.closest('.metadata-btn')) {
        popup.classList.remove('active');
    }
});

// Initialize the table with JSON data
createTable(jsonData);
