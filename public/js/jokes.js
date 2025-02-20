async function getJoke() {
  const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=txt&type=single');
  const joke = await response.text();

  document.getElementById('jokeResult').innerText = joke;
}