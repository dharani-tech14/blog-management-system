async function loadBlogs() {

    const blogList = document.getElementById("blogList");

    try {

        const response = await fetch("/api/blogs");
        const blogs = await response.json();

        if (blogs.length === 0) {
            blogList.innerHTML = "<p>No blogs available.</p>";
            return;
        }

        blogList.innerHTML = "";

        blogs.forEach(blog => {

            blogList.innerHTML += `
                <div class="blog-card">

                    <h3>${blog.title}</h3>

                    <h4>By ${blog.author}</h4>

                    <p>${blog.content}</p>

                    <button class="edit-btn"
                        onclick='openEditModal(${JSON.stringify(blog)})'>
                        Edit Blog
                    </button>

                    <button class="delete-btn"
                        onclick="deleteBlog(${blog.id})">
                        Delete Blog
                    </button>

                </div>
            `;

        });

    } catch (error) {

        blogList.innerHTML = "<p>Unable to load blogs.</p>";

    }

}

function openEditModal(blog) {

    document.getElementById("editModal").style.display = "block";

    document.getElementById("editId").value = blog.id;
    document.getElementById("editTitle").value = blog.title;
    document.getElementById("editAuthor").value = blog.author;
    document.getElementById("editContent").value = blog.content;

}

function closeModal() {

    document.getElementById("editModal").style.display = "none";

}

async function updateBlog() {

    const id = document.getElementById("editId").value;

    const title = document.getElementById("editTitle").value.trim();
    const author = document.getElementById("editAuthor").value.trim();
    const content = document.getElementById("editContent").value.trim();

    if (!title || !author || !content) {

        alert("All fields are required.");

        return;

    }

    try {

        const response = await fetch(`/api/blogs/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                author,
                content
            })

        });

        const data = await response.json();

        if (data.success) {

            alert("Blog updated successfully!");

            closeModal();

            loadBlogs();

        } else {

            alert(data.message);

        }

    } catch (error) {

        alert("Unable to update blog.");

    }

}

async function deleteBlog(id) {

    const confirmDelete = confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`/api/blogs/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (data.success) {

            alert("Blog deleted successfully!");

            loadBlogs();

        }

    } catch (error) {

        alert("Unable to delete blog.");

    }

}

loadBlogs();