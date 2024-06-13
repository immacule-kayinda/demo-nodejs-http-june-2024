const deleteButton = document.querySelector("#deleteBtn");

deleteButton.addEventListener("click", async (event) => {
  const slug = event.target.className;
  if(confirm("Voulez vous vraiment supprimer cet article")){
    try {
    console.log(slug);
    const response = await fetch(`/article/${slug}`, {
        method: "DELETE",
    });
    console.log(response);
    if (response.ok) {
        window.location.href = "/articles";
    }
    } catch (e) {
    console.error(e);
    }
  }
});
