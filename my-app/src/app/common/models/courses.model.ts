export type Course = {
    id: string | number;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated?: boolean;
}