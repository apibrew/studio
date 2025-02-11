const mode = import.meta.env.VITE_APP_MODE;

export const backendMode: 'single' | 'cloud' = mode ? mode : 'cloud'

export interface SingleBackendConfig {
    backendUrl: string
}

export function singleBackendConfig(): SingleBackendConfig {
    return loadJSONSync(import.meta.env.VITE_APP_CONFIG_FILE) as SingleBackendConfig
}

function loadJSONSync(url: string) {
    const request = new XMLHttpRequest();
    request.open('GET', url, false); // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        return JSON.parse(request.responseText);
    } else {
        throw new Error('Failed to load JSON');
    }
}
