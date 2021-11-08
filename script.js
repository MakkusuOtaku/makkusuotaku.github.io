async function loadProjects() {
    let response = await fetch('https://api.github.com/users/MakkusuOtaku/repos');
    projects = await response.json();

    // Filter projects to only include projects that are not forks
    projects = projects.filter(project => !project.fork);

    // Sort projects by number of stars
    projects.sort((a, b) => b.stargazers_count - a.stargazers_count);
    
    for (project of projects) {
        let projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        projectDiv.innerHTML = `
            <div class="project-name">${project.name}</div>
            <div class="project-description">${project.description}</div>
            <div class="project-stars">${project.stargazers_count} </div>
        `;

        // Put project inside of a tag with link to the project (open in new tab)
        let projectLink = document.createElement('a');
        projectLink.className = 'project-link';
        projectLink.href = project.html_url;
        projectLink.target = '_blank';
        projectLink.appendChild(projectDiv);


        document.getElementById('projects').appendChild(projectLink);

        delete projectDiv;
    }
}

loadProjects();