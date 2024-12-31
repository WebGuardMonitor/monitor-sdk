export const isObject = (obj: any): obj is Record<string, any> => {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}