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

                    <button
                        class="delete-btn"
                        onclick="deleteBlog(${blog.id})">
                        Delete Blog
                    </button>

                </div>
            `;

        });

    } catch (error) {

        blogList.innerHTML =
            "<p>Unable to load blogs.</p>";

    }
}


async function deleteBlog(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(`/api/blogs/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (data.success) {

            alert("Blog deleted successfully!");

            loadBlogs();

        } else {

            alert(data.message);

        }

    } catch (error) {

        alert("Unable to delete the blog.");

    }

}


loadBlogs();