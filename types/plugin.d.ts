export interface Plugin {
    name: string;
    initialize: () => void;
}