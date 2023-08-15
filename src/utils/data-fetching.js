export async function fetchExperiences() {
    const res = await fetch("http://localhost:3000/api/experience");
    return res.json();
}

export async function fetchPosts() {
    const res = await fetch("http://localhost:3000/api/posts");
    return res.json();
}

export async function fetchSinglePost(id) {
    const res = await fetch(`http://localhost:3000/api/posts?id=${id}`);
    return res.json();
}