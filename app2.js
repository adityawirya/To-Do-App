const HeadingTitle = (title) => {
    const projectTitle = document.querySelector("#project-title");

    if (typeof title === 'string') {
        projectTitle.textContent = title;
    } else {
        console.error("Your Argument is Not String!")
    }
}
HeadingTitle  ("What Are You Doing Today?")
