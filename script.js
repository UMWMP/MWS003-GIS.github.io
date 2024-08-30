// Build the tree menu
const treeMenu = document.getElementById('treeMenu');

jsonData.forEach((item, index) => {
    const mainItem = document.createElement('li');
    mainItem.innerHTML = `<span class="collapsible">${item.main}</span>`;
    treeMenu.appendChild(mainItem);

    const content = document.createElement('ul');
    content.className = 'content';
    content.innerHTML = `
        <li>Type: <span class="collapsible">${item.Type}</span></li>
        <ul class="content">
            <li>Sub: <a href="${item.Link}" target="_blank">${item.Sub}</a></li>
            <li><span class="metadata" onclick="showMetadata(${index})">Metadata</span></li>
        </ul>
    `;
    mainItem.appendChild(content);
});

// Toggle visibility of content
document.querySelectorAll('.collapsible').forEach((collapsible) => {
    collapsible.addEventListener('click', () => {
        const content = collapsible.nextElementSibling;
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
        collapsible.classList.toggle('active');
    });
});

// Show metadata in popup
function showMetadata(index) {
    const metadataContent = document.getElementById('metadataContent');
    const item = jsonData[index];
    metadataContent.innerHTML = '';
    for (let key in item) {
        if (!['main', 'Type', 'Sub', 'Link'].includes(key)) {
            metadataContent.innerHTML += `<p><strong>${key}:</strong> ${item[key]}</p>`;
        }
    }
    document.getElementById('metadataPopup').style.display = 'block';
}

// Close popup
function closePopup() {
    document.getElementById('metadataPopup').style.display = 'none';
}
