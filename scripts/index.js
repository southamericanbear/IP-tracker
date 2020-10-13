const ipForm = document.querySelector("form");
const details = document.querySelector(".details");
const getIP = new GetIP();

const updateMark = () => {
  getIP
    .defaultIP()
    .then((data) => {
      let localIP = data.ip;
      getIP.local(localIP).then((data) => updateLocal(data));
    })
    .catch((err) => console.log("Something went wrong"));
};

document.addEventListener("load", updateMark());

const updateLocal = (data) => {
  let lat = data.location.lat;
  let lng = data.location.lng;
  mymap.setView([lat, lng], 13);
  L.marker([lat, lng]).addTo(mymap);
  details.innerHTML = ` 
      <h4>IP ADDRESS <span>${data.ip}</span></h4>
      <h4>LOCATION <span>${data.location.city}, ${data.location.region}</span></h4>
      <h4>TIMEZONE<span>UTC${data.location.timezone}</span> </h4>
      <h4>ISP <span>${data.isp}</span></h4>`;
};

const updateUI = (data) => {
  let lat = data.location.lat;
  let lng = data.location.lng;
  mymap.setView([lat, lng], 13);
  L.marker([lat, lng]).addTo(mymap);
  details.innerHTML = ` 
  <h4>IP ADDRESS: <span>${data.ip}</span></h4>
  <h4>LOCATION: <span>${data.location.city}, ${data.location.region}</span></h4>
  <h4>TIMEZONE:<span>UTC- ${data.location.timezone}</span></h4>
  <h4>ISP: <span>${data.isp}</span></h4>`;
};

ipForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let ip = ipForm.ipInput.value;
  if (!ip.match(/^\d+/)) {
    alert("Please only enter numeric characters!");
  } else {
    getIP
      .updateIP(ip)
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));
  }
});

const mymap = L.map("mapid", {
  layers: [
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapToken}`,
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
      }
    ),
  ],
});
