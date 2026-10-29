const list = document.querySelector("#repository-list");
const status = document.querySelector("#status");
const count = document.querySelector("#repository-count");

function renderRepository(repository) {
  const item = document.createElement("li");
  item.className = "repository-item";

  const link = document.createElement("a");
  link.className = "repository-link";
  link.href = repository.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = repository.name;

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const metadata = document.createElement("div");
  metadata.className = "repository-meta";

  const language = document.createElement("span");
  language.textContent = repository.language;

  const date = document.createElement("time");
  date.dateTime = repository.starred_at;
  date.textContent = `Starred ${new Date(`${repository.starred_at}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  })}`;

  metadata.append(language, date);
  item.append(link, description, metadata);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    list.replaceChildren(...repositories.map(renderRepository));
    count.textContent = `${repositories.length} ${repositories.length === 1 ? "repository" : "repositories"}`;
    status.textContent = repositories.length ? "" : "No starred repositories yet.";
  } catch (error) {
    status.textContent = "Repositories could not be loaded. Run this page from a local web server and try again.";
    console.error("Could not load starred repositories:", error);
  }
}

loadRepositories();