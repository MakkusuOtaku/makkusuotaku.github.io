var projects;

async function loadImage(repo) {
    let url = `https://raw.githubusercontent.com/MakkusuOtaku/${repo.name}/${repo.default_branch}/README.md`;
    let response = await fetch(url);
    let readme = await response.text();

    // Get the first image in the readme
    let image = readme.split('\n').find(line => line.startsWith('!['));
    
    // If there is an image, get the image url
    if (image) {
        image = image.split('(')[1].split(')')[0];
        return image;
    }

    return 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60';
}

function getLink(repo) {
    if (repo.has_pages) {
        return `https://makkusuotaku.github.io/${repo.name}`;
    } else {
        return repo.html_url;
    }
}

async function generateElement(project) {
    let description = project.description || 'No description provided';
    let image = await loadImage(project);
    let link = getLink(project);

    let element = document.createElement('a');
    element.className = 'project-link';
    element.href = link;
    element.target = '_blank';

    element.innerHTML = `
        <div class="project">
            <div class="image-container">
                <img class="project-image" src="${image}" loading="lazy">
            </div>
            <div class="project-name">${project.name}</div>
            <div class="project-description">${description}</div>
            <div class="project-stats">
                <div class="project-stars">${project.stargazers_count}</div>
                <div class="project-forks">${project.forks_count}</div>
            </div>
            <div class="project-updated"> I don't know. </div>
        </div>
    `;

    document.getElementById('projects').appendChild(element);

    delete element;
}

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
        await generateElement(project);
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