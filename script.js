// Function to build the tree menu
function buildTreeMenu() {
    const treeMenu = document.getElementById('treeMenu');

    jsonData.forEach((item, index) => {
        // Create main item
        const mainItem = document.createElement('li');
        mainItem.innerHTML = `<span class="collapsible">${item.main}</span>`;
        treeMenu.appendChild(mainItem);

        // Create the content that collapses
        const content = document.createElement('ul');
        content.className = 'content';
        content.style.display = 'none';  // Start hidden
        content.innerHTML = `
            <li>Type: <span class="collapsible">${item.Type}</span></li>
            <ul class="content" style="display: none;">
                <li>Sub: <a href="${item.Link}" target="_blank">${item.Sub}</a></li>
                <li><span class="metadata" onclick="showMetadata(${index})">Metadata</span></li>
            </ul>
        `;
        mainItem.appendChild(content);
    });

    // Attach event listeners for collapsing
    document.querySelectorAll('.collapsible').forEach((collapsible) => {
        collapsible.addEventListener('click', function() {
            this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block';
            this.classList.toggle('active');
        });
    });
}

// Function to show metadata in a popup
function showMetadata(index) {
    const metadataContent = document.getElementById('metadataContent');
    const item = jsonData[index];
    metadataContent.innerHTML = '';  // Clear previous content

    // Populate metadata
    for (let key in item) {
        if (!['main', 'Type', 'Sub', 'Link'].includes(key)) {
            metadataContent.innerHTML += `<p><strong>${key}:</strong> ${item[key]}</p>`;
        }
    }

    // Show the popup
    document.getElementById('metadataPopup').style.display = 'block';
}

// Function to close the metadata popup
function closePopup() {
    document.getElementById('metadataPopup').style.display = 'none';
}

// Build the tree menu when the page loads
window.onload = function() {
    buildTreeMenu();
};
