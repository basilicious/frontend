const BASE_API_URL = 'http://localhost:8080';


const JWT_KEY = 'GENESIS_JWT';
const getJWT = () => localStorage.getItem(JWT_KEY);
const delJWT = () => localStorage.removeItem(JWT_KEY);
const setJWT = (JWT) => localStorage.setItem(JWT_KEY, JWT);

const headers = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getJWT()}`,
});

function checkJWT() {
    return getJWT() != null;
}

async function getUser() {
    const res = await fetch(`${BASE_API_URL}/auth/getUserProfile`, {
        method: 'POST',
        headers: headers()
    });

    if (res.status === 200) {
        return { error: false, payload: await res.json()}
    } else if (res.status === 401) {
        return {
            error: true,
            message: res.statusText,
            response: await res.json()
        }
    }
    return { error: true, res: await res.json() }
}

function logout() {
    delJWT();
}

export { BASE_API_URL, checkJWT, logout, setJWT, getUser };