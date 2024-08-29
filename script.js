// JavaScript to handle collapsible functionality and JSON data
document.addEventListener("DOMContentLoaded", function() {
    const dataContainer = document.getElementById("collapsible-container");

    const createCollapsibleSection = (mainType, items) => {
        const section = document.createElement("div");
        section.classList.add("collapsible");
        
        const button = document.createElement("button");
        button.classList.add("collapsible-btn");
        button.textContent = mainType;
        section.appendChild(button);
        
        const content = document.createElement("div");
        content.classList.add("collapsible-content");
        
        items.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.innerHTML = `<strong>${item.Type}</strong>: ${item.Sub} - <a href="${item.Link}" target="_blank">${item.Link}</a>`;
            content.appendChild(itemElement);
        });
        
        section.appendChild(content);
        dataContainer.appendChild(section);
    };

    const groupedData = jsonData.reduce((acc, item) => {
        if (!acc[item.Main]) {
            acc[item.Main] = [];
        }
        acc[item.Main].push(item);
        return acc;
    }, {});

    Object.keys(groupedData).forEach(mainType => {
        createCollapsibleSection(mainType, groupedData[mainType]);
    });

    var coll = document.getElementsByClassName("collapsible-btn");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
});
