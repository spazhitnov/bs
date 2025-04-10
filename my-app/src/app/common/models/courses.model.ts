export type Course = {
    id: string | number;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated?: boolean;
    authors: Author[];
}

export type Author = {
    id: number;
    lastName: string;
    name: string;
}