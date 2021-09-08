var projectsElement;
var projects;

async function loadProjects() {
    let response = await fetch('data/projects.json');
    projects = await response.json();
    
    for (key of Object.keys(projects)) {
        createProjectElement(key);
    }
}

function createProjectElement(name) {
    let card = document.createElement('div');
    card.className = "card";

    card.innerText = name;

    projectsElement.appendChild(card);
}

addEventListener('DOMContentLoaded', ()=>{
    projectsElement = document.querySelector('#projects');

    loadProjects();
});
