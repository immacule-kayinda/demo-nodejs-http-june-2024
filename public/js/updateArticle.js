const updateBtn = document.querySelector("#updateBtn");
const updateImageBtn = document.querySelector("#img");
const updateImg = document.querySelector("input[type='file']")
const form = document.querySelector("form")

const cloudName = "dzcuoxidd";
const presetName = "mxvteo84";


console.log(updateBtn, updateImg, form)

updateBtn.addEventListener("click", (event) => {
    console.log(event.target.name)
    window.location.href = "/article/update/" + event.target.name
})

updateImg.addEventListener("change", (event) => {

})



async function uploadImage(image) {
  try {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", presetName);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return data.secure_url;
  } catch (error) {
    alert("Le chargement de l'image a echoue");
    throw error;
  }
}

async function updateArticle(article){
  try {
    console.log(article)
    const response = await fetch("/articles/" + article.slug, {
        method: "PUT", 
        body:JSON.stringify(article),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    console.log(response);
    if(response.statusCode === 200){
        window.location.href = "/articles"
    }
  } catch (error) {
    console.log(error);
  }
}
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const btnSubmit = event.target.querySelector("#btn-submit");
  btnSubmit.disabled = true;

  const formData = new FormData(event.target);
  const urlToImage = await uploadImage(formData.get("img"));
  const data = Object.fromEntries(formData.entries());
  data.urlToImage = urlToImage;
  data.slug = btnSubmit.getAttribute("data-slug")
  console.log(data);
  delete data.img;
  updateArticle(data);
  btnSubmit.disabled = false;
  event.target.reset();
});