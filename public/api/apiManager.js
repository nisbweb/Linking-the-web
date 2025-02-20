async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function postData(apiUrl, data) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error("Error posting data:", error);
        return null;
    }
}

async function putData(apiUrl, data) {
    try {
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating data:", error);
        return null;
    }
}

async function deleteData(apiUrl) {
    try {
        const response = await fetch(apiUrl, {
            method: "DELETE",
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting data:", error);
        return null;
    }
}

// Export functions for use in other scripts
export { fetchData, postData, putData, deleteData };
