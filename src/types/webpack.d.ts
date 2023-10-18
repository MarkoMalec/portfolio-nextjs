declare namespace NodeJS {
    interface Global {
      require: NodeRequire;
    }
}
  
interface NodeRequire {
   context: (directory: string, useSubdirectories: boolean, regExp: RegExp) => any;
}

type User = {
    id: number;
    name: string;
    email: string;
    emailVerified: null | string;
    image: string;
    role: string;
    username: null | string;
    avatar: null | string;
}

type HomeProps = {
    experiences: ExperienceType[];
    projects: Project[];
    posts: Post[];
};

type Post = {
    id: number;
    featuredPhoto: string;
    title: string;
    content: string;
    authorId: string;
    excerpt: string;
    createdAt: string;
    type: string;
};

type ExperienceType = {
    id: number;
    company: string;
    timeframe: string;
    description: string;
    skills: string;
    type: string;
}

type Project = {
    id: number;
    featuredPhoto: string;
    title: string;
    excerpt: string;
};

type BlogHomeProps = {
    posts: Post[];
  };

type EditorProps = {
    editPostData?: { content: string, title: string };
    onContentChange: (content: string) => void;
    featuredPhoto?: null | string;
    editorData?: null | string;
}

// EditorJS plugins mostly don't have TypeScript so Im treating these as modules so TS wouldn't complain.
declare module '@editorjs/header';
declare module '@editorjs/embed';
declare module '@editorjs/table';
declare module '@editorjs/list';
declare module '@editorjs/code';
declare module '@editorjs/link';
declare module '@editorjs/inline-code';
declare module '@editorjs/image';