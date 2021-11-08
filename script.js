var projects;

async function loadProjects() {
    let response = await fetch('https://api.github.com/users/MakkusuOtaku/repos');
    projects = await response.json();

    // Filter projects to only include projects that are not forks
    projects = projects.filter(project => !project.fork);

    // Sort projects by number of stars and number of forks
    projects.sort((a, b) => {
        if (b.stargazers_count == a.stargazers_count) {
            return b.forks_count - a.forks_count;
        }
        return b.stargazers_count - a.stargazers_count;
    });
    
    for (project of projects) {
        let projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        if (!project.description) {
            project.description = 'No description provided';
        }

        let timeSinceLastUpdate = new Date() - new Date(project.updated_at);

        projectDiv.innerHTML = `
            <div class="project-name">${project.name}</div>
            <div class="project-description">${project.description}</div>
            <div ="project-stats">
                <div class="project-stars">${project.stargazers_count}</div>
                <div class="project-forks">${project.forks_count}</div>
                <div class="project-updated"> I don't know. </div>
            </div>
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

function timeSinceDateInWords(date) {
    let timeSince = new Date() - new Date(date);
    timeSince = timeSince/1000/60/60/24;

    let years = Math.floor(timeSince/365);
    let months = Math.floor(timeSince/30);
    let weeks = Math.floor(timeSince/7);
    let days = Math.floor(timeSince);
    let hours = Math.floor((timeSince - days) * 24);
    let minutes = Math.floor(timeSince * 24 * 60);

    if (years > 0) return `${years} years ago`;
    if (months > 0) return `${months} months ago`;
    if (weeks > 0) return `${weeks} weeks ago`;
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    return `Just now`;
}

setInterval(()=>{
    // Update time since last update
    let projectDivs = document.getElementsByClassName('project');
    for (let i = 0; i < projectDivs.length; i++) {
        let projectDiv = projectDivs[i];
        let timeSince = timeSinceDateInWords(projects[i].pushed_at);
        projectDiv.getElementsByClassName('project-updated')[0].innerHTML = timeSince;
    }
}, 500);