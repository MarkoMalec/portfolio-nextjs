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
    url = `${API_URL}/api/posts?title=${encodeURIComponent(title)}`;
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
