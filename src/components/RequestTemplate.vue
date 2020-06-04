<template>
  <div id="template-container">
    <div class="paper paper-light">
      <p class="label">Protocol</p>
      <div class="button-group button-group-small">
        <div class="button button-left button-active">HTTP</div>
        <div class="button button-right">HTTPS</div>
      </div>
    </div>
    <div class="paper paper-light">
      <p class="label">Method</p>
      <div class="button-group button-group-medium">
        <div class="button button-left">GET</div>
        <div class="button button-active">POST</div>
        <div class="button">PUT</div>
        <div class="button">PATCH</div>
        <div class="button">UPDATE</div>
        <div class="button button-right">DELETE</div>
      </div>
    </div>

    <div class="paper paper-dark paper-round">
      <p class="label">URL</p>
      <input type="text" class="url" />
    </div>

    <div class="paper paper-light paper-square-bottom paper-grow">
      <p class="label">Parameters</p>
      <div class="button-group button-group-small">
        <div class="button button-window">Query</div>
        <div class="button button-window button-window-selected">Path</div>
        <div class="button button-window">Header</div>
        <div class="button button-window">Body</div>
      </div>
      <div class="input-group">
        <input type="text" class="input input-window input-window-selected" placeholder="Key">
       <input type="text" class="input input-window input-window-selected" placeholder="Context">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600&family=Roboto:wght@400;500&display=swap");

#template-container {
  height: 415px;
  width: 500px;
  background: #0059c1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.paper {
  width: 97%;
  padding: 5px;
  border-radius: 5px;
  margin: 5px 0;
}
.paper-dark {
  background: #04002d;
}
.paper-light {
  background: #137bf4;
}

.label {
  color: #9bc2fa;

  font-weight: 600;
  font-family: "Raleway", sans-serif;
  font-size: 0.6em;

  text-transform: uppercase;

  padding: 5px 0 0 5px;
  margin: 0;
}

.url {
  width: 97%;

  background: #ffffff00;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #ffffff00;

  color: #dde3ff;

  font-weight: 400;
  font-family: "Roboto", sans-serif;
  font-size: 0.8em;

  padding: 5px;
  margin: 0;
}
.url:focus {
  outline: none;
}

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.button {
  color: #888888;

  font-weight: 500;
  font-family: "Raleway", sans-serif;
  font-size: 0.65em;

  text-transform: uppercase;

  background: #050023;

  width: 100%;

  text-align: center;

  margin-top: 5px;
  padding: 3px 0;

  cursor: pointer;
}
.input-rount-bottom-left {
  border-radius: 0 0 0 4px;
}
.input-rount-bottom-right {
  border-radius: 0 0 4px 0;
}
.button-active {
  background: #4caf50;
  color: white;
}
.button-window {
  background: black;
  color: white;
}
.button-window-selected {
  background: #ffc94c;
  color: black;
}
.button-group-small {
  max-width: 50%;
}
.button-group-medium {
  max-width: 85%;
}




.input-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.input {
  color: #888888;

  font-weight: 400;
  font-family: "Roboto", sans-serif;
  font-size: 0.65em;

  text-transform: uppercase;

  background: #050023;

  width: 100%;

  text-align: left;

  padding: 3px 3px;

  cursor: pointer;

  border-width: 1px;
  border-style: solid;
  border-color: #f5b922;
}
.input:focus {
  outline: none;
}
.input-left {
  border-radius: 4px 0 0 4px;
}
.input-right {
  border-radius: 0 4px 4px 0;
}
.input-active {
  background: #4caf50;
  color: white;
}
.input-window {
  background: black;
  color: white;
}
.input-window-selected {
  background: #ffc94c;
  color: black;
}
.input-group-small {
  max-width: 50%;
}
.input-group-medium {
  max-width: 85%;
}



</style>