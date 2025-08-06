export type Poster = {
    id: number;
    image_url: string;
    created_at: Date;
    updated_at: Date;
};

export type PosterCreate = {
    image: File | null;
    research_upload_id: string | null;
};
