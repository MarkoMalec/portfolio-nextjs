export async function fetchExperiences() {
    const res = await fetch("http://localhost:3000/api/experience");
    return res.json();
}

export async function fetchPosts() {
    const res = await fetch("http://localhost:3000/api/posts");
    return res.json();
}

export async function fetchSinglePost(id, title) {
    let url;
    if (id) {
        url = `http://localhost:3000/api/posts?id=${id}`;
    } else if (title) {
        url = `http://localhost:3000/api/posts?title=${encodeURIComponent(title)}`;
    }

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch post. Status: ${res.status}`);
    }
    return res.json();
}
