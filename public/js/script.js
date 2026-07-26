const form = document.getElementById("blogForm");

const title = document.getElementById("title");
const author = document.getElementById("author");
const content = document.getElementById("content");

const titleError = document.getElementById("titleError");
const authorError = document.getElementById("authorError");
const contentError = document.getElementById("contentError");

const success = document.getElementById("success");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    // Clear previous messages
    titleError.textContent = "";
    authorError.textContent = "";
    contentError.textContent = "";
    success.textContent = "";

    let isValid = true;

    // Blog Title Validation
    if (title.value.trim() === "") {
        titleError.textContent = "⚠ Blog title is required.";
        isValid = false;
    } else if (title.value.trim().length < 5) {
        titleError.textContent = "⚠ Title must contain at least 5 characters.";
        isValid = false;
    }

    // Author Validation
    if (author.value.trim() === "") {
        authorError.textContent = "⚠ Author name is required.";
        isValid = false;
    } else if (author.value.trim().length < 3) {
        authorError.textContent = "⚠ Author name must contain at least 3 characters.";
        isValid = false;
    }

    // Blog Content Validation
    if (content.value.trim() === "") {
        contentError.textContent = "⚠ Blog content cannot be empty.";
        isValid = false;
    } else if (content.value.trim().length < 20) {
        contentError.textContent = "⚠ Content must contain at least 20 characters.";
        isValid = false;
    }

    // Success
    if (isValid) {

        success.textContent = "🎉 Blog submitted successfully!";
        success.classList.add("success");

        form.reset();

        // Hide success message after 3 seconds
        setTimeout(() => {
            success.textContent = "";
        }, 3000);
    }

});