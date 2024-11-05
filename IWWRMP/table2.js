const mwsID = '003'; // Replace with the actual value of mwsID
const csvFilePath = `https://raw.githubusercontent.com/MWS003-GIS/MWS003-GIS.github.io/main/IWWRMP/Data/EXD/MWS_${mwsID}/datalayer_${mwsID}.csv`;
let allData = []; // Store all parsed CSV data

// Fetch and parse the CSV file
fetch(csvFilePath)
    .then(response => response.text())
    .then(csvText => {
        Papa.parse(csvText, {
            header: true,
            complete: function(results) {
                allData = results.data;
                displayData(allData); // Initially display all data
                updateDropdownOptions(allData); // Populate all dropdowns based on full data
            }
        });
    });

// Function to populate dropdowns with unique values from the entire dataset
function updateDropdownOptions(data) {
    updateDropdownWithSelected('filterID', getUniqueValues(data, 'MWS'));
    updateDropdownWithSelected('filterDatabase', getUniqueValues(data, 'Database'));
    updateDropdownWithSelected('filterLayer', getUniqueValues(data, 'Layer'));
    updateDropdownWithSelected('filterProvider', getUniqueValues(data, 'Provider'));
}

// Helper function to get unique values from a column
function getUniqueValues(data, column) {
    return Array.from(new Set(data.map(row => row[column]).filter(Boolean)));
}

// Helper function to populate a dropdown and retain the selected value
function updateDropdownWithSelected(dropdownID, values) {
    const dropdown = document.getElementById(dropdownID);
    const selectedValue = dropdown.value; // Store the currently selected value
    dropdown.innerHTML = ''; // Clear existing options

    // Add an "Any" option at the top of the list
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Any';
    dropdown.appendChild(defaultOption);

    // Populate dropdown with the filtered unique values
    values.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        dropdown.appendChild(option);
    });

    // Reapply the previously selected value (if it exists in the new options)
    dropdown.value = values.includes(selectedValue) ? selectedValue : '';
}

// Function to display the CSV data in the table
function displayData(data) {
    const tableBody = document.querySelector('#csvTable tbody');
    tableBody.innerHTML = ''; // Clear the table body

    data.forEach(row => {
        const tr = document.createElement('tr');
        const colsToShow = [row.MWS, row.Database, row.Layer, row['Provider']];
        colsToShow.forEach(col => {
            const td = document.createElement('td');
            td.textContent = col;
            tr.appendChild(td);
        });

        // Add a "Download SHP" button in the last column
        const td = document.createElement('td');
        const button = document.createElement('button');
        button.textContent = "Download SHP";
        button.onclick = () => window.open(row['Download-SHP'], '_blank');
        td.appendChild(button);
        tr.appendChild(td);
        
        tableBody.appendChild(tr);
    });
}

// Filter the table and update dropdown options based on remaining filtered data
function filterTable() {
    const filterID = document.getElementById('filterID').value;
    const filterDatabase = document.getElementById('filterDatabase').value;
    const filterLayer = document.getElementById('filterLayer').value;
    const filterProvider = document.getElementById('filterProvider').value;

    // Apply selected filters to data
    const filteredData = allData.filter(row =>
        (!filterID || row.MWS === filterID) &&
        (!filterDatabase || row.Database === filterDatabase) &&
        (!filterLayer || row.Layer === filterLayer) &&
        (!filterProvider || row['Provider'] === filterProvider)
    );

    displayData(filteredData); // Update displayed data based on filtered data
    
    // Update dropdown options based on currently filtered data
    updateDropdownOptions(filteredData);
}

// Add event listeners to dropdowns
['filterID', 'filterDatabase', 'filterLayer', 'filterProvider'].forEach(id => {
    document.getElementById(id).addEventListener('change', filterTable);
});