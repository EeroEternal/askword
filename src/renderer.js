import "../react/app.js";

window.electronAPI.handleConfig((_event, value) => {
  console.log("handle config", value)
})
