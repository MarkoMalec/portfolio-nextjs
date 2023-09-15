const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchExperiences() {
  const res = await fetch(`${API_URL}/api/experience`);
  return res.json();
}

export async function fetchPosts() {
  const res = await fetch(`${API_URL}/api/posts`);
  return res.json();
}

export async function fetchSinglePost(id, title) {
  let url;
  if (id) {
    url = `${API_URL}/api/posts?id=${id}`;
  } else if (title) {
    const formattedTitle = title.replace(/ /g, "-");
    url = `${API_URL}/api/posts?title=${encodeURIComponent(formattedTitle)}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch post. Status: ${res.status}`);
  }
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_URL}/api/projects`);
  return res.json();
}

export async function fetchSingleProject(id, title) {
  let url;
  if (id) {
    url = `${API_URL}/api/projects?id=${id}`;
  } else if (title) {
    const formattedTitle = title.replace(/ /g, "-");
    url = `${API_URL}/api/projects?title=${encodeURIComponent(formattedTitle)}`;
  }

  const res = await fetch(url);
  if(!res.ok) {
    throw new Error(`Failed to fetch a project. Status: ${res.status}`)
  }
  return res.json();
}

export async function fetchDailyStats(baseURL) {
  const response = await fetch(`${baseURL}/api/posts?type=dailyStats`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function fetchUsers() {
  const res = await fetch(`${API_URL}/api/users`);
  return res.json();
}
