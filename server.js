import express from "express";
import path from "path";

const events = [
    {
        id: 1,
        name: "event-1",
        status: "pending",
    },
    {
        id: 2,
        name: "event-2",
        status: "pending",
    },
    {
        id: 3,
        name: "event-3",
        status: "pending",
    },
];
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get("/api/events", (req, res) => {
    res.status(200).json(events);
});

app.get("/api/events/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const event = events.find((e) => e.id === id);

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404);
    }
});

app.post("/api/events", (req, res) => {
    const newEvent = req.body;
    events.push(newEvent);
    res.status(201).json(newEvent);
});

app.put("/api/events/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const newEvent = req.body;
    console.log(newEvent);
    const event = events.findIndex((e) => e.id === id);
    console.log(event);
    try {
        if (event) {
            events[event] = {
                ...events[event],
                ...newEvent,
            };
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
    res.status(200).json(id);
});

app.delete("/api/events/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const event = events.findIndex((e) => e.id === id);
    events[event] = null;

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
