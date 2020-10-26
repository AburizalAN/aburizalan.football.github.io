const base_url = "https://api.football-data.org/v2/";
// Blok kode yang akan di panggil jika fetch berhasil
const status = (response) => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
const json = (response) => {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
const error = (error) => {
  // Parameter error berasal dari Promise.reject()
  alert('Harap periksa koneksi jaringan anda')
  console.log("Error : " + error);
}

const getStandingById = () => {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if('caches' in window) {
    caches.match(`${base_url}competitions/${idParam}/standings`).then(response => {
      if (response) {
        response.json().then(data => {
          let insideHTML = "";
          let teamId = [];
          data.standings[0].table.forEach(item => {
            insideHTML += `
              <div class="col l4 s12 pb-4">
                <div class="item center-align">
                  <img src='${item.team.crestUrl}'>
                  <a class='save'>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bookmark-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm4.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"/>
                    </svg>
                  </a>
                  <div class='position'>Position : ${item.position}</div>
                  <h5>${item.team.name}</h5>
                  <div class='detail mb-4'>
                    <span>Won : ${item.won}</span>
                    <span>Draw : ${item.draw}</span>
                    <span>Lost : ${item.lost}</span>
                  </div>
                  <a href="./team.html?id=${item.team.id}" class="detail-btn">Team Detail</a>
                </div>
              </div>
            `
            teamId.push(item.team.id)
          })
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("content").innerHTML = insideHTML;
          const saveBtn = document.querySelectorAll('.save');
          console.log(saveBtn.length);
          saveBtn.forEach((btn, i) => {
            btn.addEventListener('click', () => {
              console.log('Team Added');
              const save = getTeamData(teamId[i]);
              save.then(team => {
                saveForLater(team);
              })
            })
          })
        })
      }
    })
  }

  const getTeamData = (id) => {
    return new Promise((resolve, reject) => {
      var idParam = id;
  
      if ('caches' in window) {
        caches.match(`${base_url}teams/${idParam}`).then(response => {
          if (response) {
            response.json().then(data => {
              resolve(data);
            })
          }
        })
      }

      fetch(`${base_url}teams/${idParam}`, {
        headers : {
          "X-Auth-Token": "1f69dac1aa144f60bc03f9faaa652114"
        }
      })
      .then(status)
      .then(json)
      .then(data => {  
        resolve(data);
      })
    })  
  }

  fetch(`${base_url}competitions/${idParam}/standings`, {
    headers : {
      "X-Auth-Token": "1f69dac1aa144f60bc03f9faaa652114"
    }
  })
  .then(status)
  .then(json)
  .then(data => {
    let teamId = [];
    let insideHTML = "";
    data.standings[0].table.forEach(item => {
      insideHTML += `
        <div class="col l4 s12 pb-4">
          <div class="item center-align">
            <img src='${item.team.crestUrl}'>
            <a href="#" class='save'>
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bookmark-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm4.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"/>
              </svg>
            </a>
            <div class='position'>Position : ${item.position}</div>
            <h5>${item.team.name}</h5>
            <div class='detail mb-4'>
              <span>Won : ${item.won}</span>
              <span>Draw : ${item.draw}</span>
              <span>Lost : ${item.lost}</span>
            </div>
            <a href="./team.html?id=${item.team.id}" class="detail-btn">Team Detail</a>
          </div>
        </div>
      `
      teamId.push(item.team.id)
    })
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("content").innerHTML = insideHTML;
    const saveBtn = document.querySelectorAll('.save');
    console.log(saveBtn.length);
    saveBtn.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        console.log('Team Added');
        const save = getTeamData(teamId[i]);
        save.then(team => {
          saveForLater(team);
        })
      })
    })
  })
  .catch(error)
}

const getTeamById = () => {

  return new Promise((resolve, reject) => {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ('caches' in window) {
      caches.match(`${base_url}teams/${idParam}`).then(response => {
        if (response) {
          response.json().then(data => {
            let insideHTML = "";
            let players = '';
            data.squad.forEach(player => {
              players += `
              <div class='col s12 l3 player center-align'>
                <div class='mb-4 p-4 white'>
                  <img src='./img/player.svg' class='mb-3'>
                  <h6>Name : ${player.name}</h6>
                  <h6>Position : ${player.position}</h6>
                </div>
              </div>
              `
            })
            insideHTML = `
              <div class='col s12 mb-5'>
                <div class='title white p-5'>
                  <div class='row align-items-center'>
                    <div class='col-lg-2'>
                      <img src='${data.crestUrl}' class='m-auto'>
                    </div>
                    <div class='col l8 s12'>
                      <h1 style="margin-top: 10px !important">${data.name}</h1>
                      <h6>Address : ${data.address}</h6>
                      <h6>Website : <a href= '${data.website}'>${data.website}</a></h6>
                    </div>
                  </div>
                </div>
              </div>
        
              <div class='col s12 mb-4'>
                <h4>Squads</h4>
              </div>
        
              <div class='col s12'>
                <div class='row'>
                  ${players}
                </div>
              </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("content").innerHTML = insideHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          })
        }
      })
    }


    fetch(`${base_url}teams/${idParam}`, {
      headers : {
        "X-Auth-Token": "1f69dac1aa144f60bc03f9faaa652114"
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      let insideHTML = "";
      let players = '';
      data.squad.forEach(player => {
        players += `
        <div class='col s12 l3 player text-center'>
          <div class='mb-4 p-4 white'>
            <img src='./img/player.svg' class='mb-3'>
            <h6>Name : ${player.name}</h6>
            <h6>Position : ${player.position}</h6>
          </div>
        </div>
        `
      })
      insideHTML = `
        <div class='col s12 mb-5'>
          <div class='title white p-5'>
            <div class='row align-items-center'>
              <div class='col l2 s12'>
                <img src='${data.crestUrl}' class='m-auto'>
              </div>
              <div class='col l8 s12'>
                <h1 style="margin-top: 10px !important">${data.name}</h1>
                <h6>Address : ${data.address}</h6>
                <h6>Website : <a href= '${data.website}'>${data.website}</a></h6>
              </div>
            </div>
          </div>
        </div>

        <div class='col s12 mb-4'>
          <h4>Squads</h4>
        </div>

        <div class='col s12'>
          <div class='row'>
            ${players}
          </div>
        </div>
      `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("content").innerHTML = insideHTML;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(data);
    })
  })

  
}

const getSavedTeams = () => {
  getAll().then(teams => {
    console.log(teams);
    let content = document.getElementById("content");
    let idTeam = [];

    teams.forEach(team => {
      content.innerHTML += `
      <div class="col l4 s12 pb-4">
        <div class="item center-align">
          <a href="saved.html" class='delete' id='${team.id}'>
            <span class="material-icons">delete_forever</span>
          </a>
          <img src='${team.crestUrl}'>
          <h5>${team.name}</h5>
          <a href="./team.html?id=${team.id}&saved=true" class="detail-btn">Team Detail</a>
        </div>
      </div>
      `
      idTeam.push(team.id);
    })

    const del = document.querySelectorAll(`.delete`);
    del.forEach((item, i) => {
      item.addEventListener('click', () => {
        deleteTeam(idTeam[i]);
      })
    })
      
  })
}

const getSavedTeamById = () => {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(parseInt(idParam)).then(data => {
    let insideHTML = "";
    let players = '';
    data.squad.forEach(player => {
      players += `
      <div class='col s12 col l3 player center-align'>
        <div class='mb-4 p-4 white'>
          <img src='./img/player.svg' class='mb-3'>
          <h6>Name : ${player.name}</h6>
          <h6>Position : ${player.position}</h6>
        </div>
      </div>
      `
    })
    insideHTML = `
      <div class='col s12 mb-5'>
        <div class='title white p-5'>
          <div class='row'>
            <div class='col l2 s12'>
              <img src='${data.crestUrl}' class='m-auto'>
            </div>
            <div class='col l8 s12'>
              <h1 style="margin-top: 10px !important">${data.name}</h1>
              <h6>Address : ${data.address}</h6>
              <h6>Website : <a href= '${data.website}'>${data.website}</a></h6>
            </div>
          </div>
        </div>
      </div>

      <div class='col s12 mb-4'>
        <h4>Squads</h4>
      </div>

      <div class='col s12'>
        <div class='row'>
          ${players}
        </div>
      </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("content").innerHTML = insideHTML;
  })
}

