import sendRequest from "./send-request";
const BASE_URL = '/api/games';

export async function createGame(gameData) {
    return sendRequest(BASE_URL, 'POST', gameData);
}

export async function getAll() {
    return sendRequest(BASE_URL);
}
