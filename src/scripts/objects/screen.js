const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    document.querySelector(".profile-data").innerHTML = `
    <span class="info">
        <img src="${user.avatarUrl}" alt="profile pic" />
            <span class="data">
                <h1>${user.name ?? "Sem nome cadastrado."}</h1>
                <h2>${user.userName}</h2>
                <h3>${user.bio ?? "Sem bio cadastrada."}</h3>
                <span class="follow-info">                
                  <p><span class="follow-title">👥 Seguidores:</span><br/>${user.followers}</p>
                  <p><span class="follow-title">👤 Seguindo:</span><br/>${user.following}</p>
                </span>
            </span>
    </span>`;

    let repositoriesItems = "";
    user.repositories.forEach(
      (repo) =>
        (repositoriesItems += `
        <li>
          <a href="${repo.html_url}" target="_blank">${repo.name}
            <span class="repo-status">
              <span class="count">🍴: ${repo.forks_count}</span>
              <span class="count">🌟: ${repo.stargazers_count}</span> 
              <span class="count">👀: ${repo.watchers_count}</span>
              <span class="count">💻: ${repo.language}</span>
            </span>
        </a>

        </li>
        `)
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `
        <span class="repositories section">
            <h2>Repositórios</h2>
            <ul>${repositoriesItems}</ul>
        </span>`;
    }

    let eventsItems = "";
    user.events.forEach((event) => {
      if (event.type === 'PushEvent') {
        eventsItems += `
        <li>
          <a>${event.repo.name}<span class="commit-message">-${event.payload.commits[0].message}</span></a>
        </li>
        `;
      } else {
        eventsItems += `
        <li>
          <a>${event.repo.name}<span class="commit-message">-${event.payload.ref_type} foi criado.</span></a>
        </li>
        `;
      }
    });

    if (user.events.length > 0) {
      this.userProfile.innerHTML += `
        <span class="events section">
            <h2>Eventos</h2>
            <ul>${eventsItems}</ul>
        </span>`;
    }
  },
};

export { screen };
