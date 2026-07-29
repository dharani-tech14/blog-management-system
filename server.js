const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Temporary storage
let blogs = [];

// GET Route
app.get("/api/blogs", (req, res) => {
    res.json(blogs);
});

// POST Route
app.post("/api/blogs", (req, res) => {

    const { title, author, content } = req.body;

    if (!title || !author || !content) {

        return res.status(400).json({

            success: false,
            message: "All fields are required."

        });

    }

    const blog = {

        id: Date.now(),
        title,
        author,
        content,
        createdAt: new Date()

    };

    blogs.push(blog);

    res.status(201).json({

        success: true,
        message: "Blog added successfully!",
        blog

    });

});

// DELETE Route
app.delete("/api/blogs/:id", (req, res) => {

    const id = Number(req.params.id);

    const blogIndex = blogs.findIndex(blog => blog.id === id);

    if (blogIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Blog not found."
        });
    }

    const deletedBlog = blogs.splice(blogIndex, 1);

    res.json({
        success: true,
        message: "Blog deleted successfully!",
        blog: deletedBlog[0]
    });

});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});