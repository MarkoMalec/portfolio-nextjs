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
};

export type ExperienceType = {
    id: number;
    company: string;
    timeframe: string;
    description: string;
    skills: string;
}

export type Project = {
    id: number;
    featuredPhoto: string;
    title: string;
    excerpt: string;
};