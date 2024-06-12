const form = document.querySelector("form");

const cloudName = "dzcuoxidd";
const presetName = "mxvteo84";

// https://api.cloudinary.com/v1_1/<CLOUD_NAME>/image/upload

/**
 * Uploads an image to Cloudinary and returns the secure URL.
 *
 * @param {File} image - The image file to be uploaded.
 * @returns {Promise<string>} - A promise that resolves to the secure URL of the uploaded image.
 * @throws Will throw an alert if the image upload fails.
 */
async function uploadImage(image) {
  try {
    // Construct the URL for the Cloudinary API endpoint
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    // Create a new FormData object to hold the image file and preset
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", presetName);

    // Send a POST request to the Cloudinary API endpoint with the image file and preset
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    // Parse the response JSON to get the secure URL
    const data = await response.json();

    // Return the secure URL
    return data.secure_url;
  } catch (error) {
    // If the image upload fails, show an alert and re-throw the error
    alert("Le chargement de l'image a echoue");
    throw error;
  }
}

async function addArticle(article){
  try {
    const response = await fetch("/articles", {
      method: "POST", 
      body:JSON.stringify(article),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (response.ok) {
      window.location.href = "/articles"
    }
    
    console.log(response);
  } catch (error) {
    
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
  delete data.img;
  addArticle(data);
  btnSubmit.disabled = false;
  event.target.reset();
});
