async function loadProjects() {
    let response = await fetch('https://api.github.com/users/MakkusuOtaku/repos');
    projects = await response.json();

    // Filter projects to only include projects that are not forks
    projects = projects.filter(project => !project.fork);

    // Sort projects by number of stars and number of forks
    projects.sort((a, b) => {
        let scoreA = a.stargazers_count+a.forks_count;
        let scoreB = b.stargazers_count+b.forks_count;

        return scoreB - scoreA;
    });
    
    for (project of projects) {
        await generateElement(project);
    }
}

async function generateElement(project) {
    let description = project.description || 'No description provided';

    let element = document.createElement('a');
    element.className = "project";

    element.href = `https://makkusuotaku.github.io/${project.name}`;
    element.target = "_blank";

    element.innerHTML = `
        <div class="name">${project.name}</div>
        <div class="description">${description}</div>
        <div class="stats">
            <div class="stars" title="stars">⭐${project.stargazers_count}</div>
            <div class="forks" title="forks">🌵${project.forks_count}</div>
        </div>
    `;

    document.getElementById('projects').appendChild(element);

    delete element;
}

loadProjects();

/*
for (let i = 0; i < 16; i++) {
    generateElement({
        name: "example",
        description: "",
        stargazers_count: Math.floor(Math.random()*20),
        forks_count: Math.floor(Math.random()*20),
    });
}
//*/