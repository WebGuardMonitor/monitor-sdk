/**
 * Generate a random password using the web crypto API.
 *
 * @param {number} len Length of the password to generate.
 * @returns {string} A randomly generated password of len.
 */
export const generatePassword = (len: number = 32): string => {
    const getBytes = () => {
        const result = new Uint8Array(1);
        window.crypto.getRandomValues(result);
        return result[0];
    };

    return Array.from({ length: len })
        .map(() => {
            let result = '';
            do {
                // @ts-ignore
                result = String.fromCharCode(getBytes());
            } while (!/[a-zA-Z0-9_\-+.$#%&^*()!~`]/.test(result));

            return result;
        })
        .join('');
};
