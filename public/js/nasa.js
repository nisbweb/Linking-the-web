async function getNasaImage() {
    const apiKey = "Ru1UxMUD3CPu9fc2qKtSoqKimhlaYEP4VMFXbldl";
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    const data = await response.json();

    let mediaContent;
    if (data.media_type === "image") {
        mediaContent = `<img src="${data.url}" alt="NASA Image of the Day" style="width:100%; max-width:600px; border-radius: 8px;">`;
    } else if (data.media_type === "video") {
        mediaContent = `<iframe src="${data.url}" style="width:100%; max-width:600px; height:350px; border-radius: 8px;" frameborder="0" allowfullscreen></iframe>`;
    } else {
        mediaContent = "<p>Media format not supported.</p>";
    }

    const result = `
        <h2>${data.title}</h2>
        ${mediaContent}
        <p>${data.explanation}</p>
    `;

    document.getElementById('nasaResult').innerHTML = result;
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", getNasaImage);