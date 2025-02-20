const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let savedRequests = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));
app.get('/weather', (req, res) => res.sendFile(path.join(__dirname, 'views/weather.html')));
app.get('/jokes', (req, res) => res.sendFile(path.join(__dirname, 'views/jokes.html')));
app.get('/nasa', (req, res) => res.sendFile(path.join(__dirname, 'views/nasa.html')));
app.get('/manage', (req, res) => res.sendFile(path.join(__dirname, 'views/manage.html')));

// API routes for managing saved API requests
app.get('/api/requests', (req, res) => {
    res.json(savedRequests);
});

app.post('/api/save', (req, res) => {
    const { name, url } = req.body;
    if (!name || !url) return res.status(400).json({ error: 'Name and URL required' });
    const newRequest = { id: savedRequests.length + 1, name, url };
    savedRequests.push(newRequest);
    res.status(201).json(newRequest);
});

app.put('/api/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, url } = req.body;
    const requestIndex = savedRequests.findIndex(req => req.id == id);
    if (requestIndex === -1) return res.status(404).json({ error: 'Not found' });
    savedRequests[requestIndex] = { id: Number(id), name, url };
    res.json(savedRequests[requestIndex]);
});

app.delete('/api/delete/:id', (req, res) => {
    const { id } = req.params;
    savedRequests = savedRequests.filter(req => req.id != id);
    res.json({ message: 'Deleted successfully' });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
