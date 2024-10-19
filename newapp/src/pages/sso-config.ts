export function googleAuthUrl() {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';

    const CLIENT_ID = '614495599348-ahqmnlfbfi54dlbourfi2anllid8ejvi.apps.googleusercontent.com';
    const REDIRECT_URI = window.location.origin + '/google-sso';

    return `${oauth2Endpoint}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${scope}&include_granted_scopes=true`;
}
