export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("Saved token:", user?.token);


    if (user && user.token) {
        // Ensure the header includes the 'Bearer ' prefix
        return { 'Authorization': `${user?.token}` };
    } else {
        return {};
    }
}
