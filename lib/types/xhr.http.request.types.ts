export interface XhrHttpRequestTypes {
    method: string;
    url: string | URL;
    headers: {
        [key: string]: string;
    },
    start_time: number;
    end_time: number;
    duration: number;
}
