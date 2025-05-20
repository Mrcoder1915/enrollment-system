

 const fetchRefresh = async (url, options = {}) => {
    console.log("fetching............");
    
    let res = await fetch(url, {
        ...options,
        credentials: "include",
    });

    let data;

    try {
        data = await res.clone().json(); // clone allows retry later
    } catch (err) {
        data = {};
    }
    console.log("message",data.message, res.status)
    
    if (res.status === 401 && data.message == "UNAUTHORIZED") {

        const refreshTokenResponse = await fetch("api/refreshToken", {
            method: "GET",
        });

        if (refreshTokenResponse.status === 401) {

            console.log("Token refresh failed. Logging out user...");

            window.location.href = "/studentLogin"
            return null
        }
        console.log("REFRESH SUCCESSFULL")

        res = await fetch(url, {
            ...options,
            credentials: "include",
        });
    }

    return res;
};

export default fetchRefresh