export async function fetchExperiences() {
    const res = await fetch("http://localhost:3000/api/experience");
    return res.json();
}

export async function fetchPosts() {
    const res = await fetch("http://localhost:3000/api/posts");
    return res.json();
}