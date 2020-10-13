class GetIP {
  constructor() {
    this.ipifyKey = ipifyKey;
  }
  async updateIP(ip) {
    const url = `https://geo.ipify.org/api/v1?apiKey=${this.ipifyKey}&ipAddress=${ip}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}
