

const loginButton = document.getElementById("login-button");

//Authorization script to run on login button click
loginButton.addEventListener("click", () => {
  const client_id = process.env.CLIENT_ID; //Importing client id from .env
  const redirect_uri = 'http://localhost:8080/playlist.html'; //Where to redirect when authorized

  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

  window.location.href = url;
});
