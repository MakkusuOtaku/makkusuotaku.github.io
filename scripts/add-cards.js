var projectsElement;

const projects = [
    {
        name: "mc-printer"
    }
];

async function loadProjects() {
    let response = await fetch('data/projects.json');
    let data = await response.json();
    console.log(data);
}

function createProjectElement(info) {
    let card = document.createElement('div');
    card.className = "card";

    card.innerText = info.name;

    projectsElement.appendChild(card);
}

addEventListener('DOMContentLoaded', ()=>{
    projectsElement = document.querySelector('#projects');
    
    for (project of projects) {
        createProjectElement(project);
    }
});
