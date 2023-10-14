export type HomeProps = {
    experiences: ExperienceType[];
    projects: Project[];
    posts: Post[];
};

export type Post = {
    id: number;
    featuredPhoto: string;
    title: string;
    content: string;
    authorId: string;
    excerpt: string;
    createdAt: string;
    type: string;
};

export type ExperienceType = {
    id: number;
    company: string;
    timeframe: string;
    description: string;
    skills: string;
    type: string;
}

export type Project = {
    id: number;
    featuredPhoto: string;
    title: string;
    excerpt: string;
};