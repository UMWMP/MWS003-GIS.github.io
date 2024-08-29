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

        // Group by Type within the main section
        const groupedByType = items.reduce((acc, item) => {
            if (!acc[item.Type]) {
                acc[item.Type] = [];
            }
            acc[item.Type].push(item);
            return acc;
        }, {});

        Object.keys(groupedByType).forEach(type => {
            const typeSection = document.createElement("div");
            typeSection.classList.add("collapsible");

            const typeButton = document.createElement("button");
            typeButton.classList.add("collapsible-btn");
            typeButton.textContent = type;
            typeSection.appendChild(typeButton);

            const typeContent = document.createElement("div");
            typeContent.classList.add("collapsible-content");

            groupedByType[type].forEach(item => {
                const itemElement = document.createElement("a");
                itemElement.href = item.Link;
                itemElement.target = "_blank";
                itemElement.textContent = item.Sub;
                typeContent.appendChild(itemElement);
            });

            typeSection.appendChild(typeContent);
            content.appendChild(typeSection);
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
