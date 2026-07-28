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

                </div>

            `;

        });

    } catch (error) {

        blogList.innerHTML = "<p>Unable to load blogs.</p>";

    }

}

loadBlogs();