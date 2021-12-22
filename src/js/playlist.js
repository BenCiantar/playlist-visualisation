
function getAccessToken() {
  const hash = window.location.hash;
  const hashWithoutHash = hash.substring(1); //Takes all characters from index 1 onwards

  const params = hashWithoutHash.split('&'); //Returns an array of each string seperated by the &s
  const keyValues = params.map((param) => param.split('=')); //Split the value into a pair, with the access token in second position

  const accessToken = keyValues[0][1]; //Retrieve the second value in the split pair

  return accessToken;
}

function getPlaylist(playlistId) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
  };

  return fetch(url, { headers }).then((response) => response.json());
}

function renderPlaylist(playlistId) {
  const container = document.getElementById('tracks');
  const audioPlayer = document.getElementById('player');

  //Run the function, inserting the desired playlist id
  getPlaylist(playlistId).then((playlist) => {
  const tracks = playlist.tracks.items;
  console.log(playlist);

  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i].track;

    const playlistItem = document.createElement('div');
    playlistItem.classList.add('playlist-item');

    const playlistItemImg = document.createElement('img');
    playlistItemImg.classList.add('playlist-item-img');    
    playlistItemImg.setAttribute('src', track.album.images[1].url)

    const playlistItemTitle = document.createElement('div');
    playlistItemTitle.classList.add('playlist-item-title');    
    playlistItemTitle.innerHTML = track.name;

    playlistItem.addEventListener('click', () => {
      if (currentlyActive === track.id) {
        audioPlayer.pause();
        currentlyActive = null;
        playlistItem.classList.remove('active');
      } else {
        if (currentlyActive) {
          document.querySelector('.active').classList.remove('active');
        }
        currentlyActive = track.id;
        playlistItem.classList.add('active');
        if (track.preview_url) {
          audioPlayer.setAttribute('src', track.preview_url);
          audioPlayer.play();      
      } else {
        audioPlayer.pause();
      }
  }
});

    playlistItem.appendChild(playlistItemImg);
    playlistItem.appendChild(playlistItemTitle);
    container.appendChild(playlistItem);

  }
  });
}

let currentlyActive;
renderPlaylist('3jeZyZSipPR8ml6s6GtFG7');


