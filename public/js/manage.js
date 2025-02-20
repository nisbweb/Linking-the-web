document.addEventListener("DOMContentLoaded", () => {
    const resultDiv = document.getElementById('apiResults');

    function fetchRequests() {
        fetch('/api/requests')
            .then(res => res.json())
            .then(data => {
                resultDiv.innerHTML = data.map(req => `
                    <div class='card'>
                        <p><strong>${req.name}</strong>: ${req.url}</p>
                        <button onclick="updateRequest(${req.id})">Update</button>
                        <button onclick="deleteRequest(${req.id})">Delete</button>
                    </div>
                `).join('');
            });
    }

    document.getElementById('saveApiForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('apiName').value;
        const url = document.getElementById('apiUrl').value;
        fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, url })
        }).then(() => fetchRequests());
    });

    window.updateRequest = function (id) {
        const name = prompt('Enter new name:');
        const url = prompt('Enter new URL:');
        fetch(`/api/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, url })
        }).then(() => fetchRequests());
    };

    window.deleteRequest = function (id) {
        fetch(`/api/delete/${id}`, { method: 'DELETE' })
            .then(() => fetchRequests());
    };

    fetchRequests();
});