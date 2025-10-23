export const $fetch = async (route, {method="GET", body={}} = {}) => {
    // api-of

    let headers = {}

    if (localStorage.getItem("token")) {
        headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    }

    const url = new URL(`https://ammavaivfkua.buymysite.ru/${route}`);

    console.log(url)
    
    if (method === "GET") {
        url.search = new URLSearchParams(body)
        body = null
    }
    
    console.log("request:", {
        "route": url,
        "method": method,
        "body": body
    })
    
    const response = await fetch(url, {
        headers, method, body
    });

    console.log(response)

    return exit(response);
}

async function exit(response) {
    let json
    try {
        json = await response.json();
    } catch {
        json = null
    }

    if (!response.ok) {
        console.error("$fetch exit error:", json)
    }

    return json;
}