export interface XhrRequest {
    method: string;
    url: string | URL;
    header: {
        [key: string]: string;
    };
    startTime: number;
    duration: number;
    async?: boolean;
    username?: string | null;
    password?: string | null;
}
