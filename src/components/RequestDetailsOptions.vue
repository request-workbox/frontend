<template>
  <div id="requestoptionssettings-container">
    <div class="paper paper-light">
      <p class="label">Permissions</p>
      <p class="label label-dark">Request Accessible By</p>
      <select class="select">
        <option class="option">Any task</option>
        <option class="option">Tasks from my project</option>
        <option class="option">No other tasks</option>
      </select>
      <p class="label label-dark">Result Accessible By</p>
      <select class="select">
        <option class="option">Any task</option>
        <option class="option">Tasks from my project</option>
        <option class="option">No other tasks</option>
      </select>
    </div>

    <div class="paper paper-dark">
      <p class="label">Request Accessible As</p>
      <input type="text" class="result" />
      <div class="spacer"></div>
      <p class="label">Result Accessible As</p>
      <input type="text" class="result" />
    </div>

    <div class="paper paper-light paper-square-bottom paper-grow">
      <p class="label">Request Transformers</p>
      <div class="input-group">
        <div class="input-action">⬆</div>
        <div class="input-action">⬇</div>
        <select class="select input input-window input-window-selected">
          <option class="option">Any task</option>
          <option class="option">Tasks from my project</option>
          <option class="option">No other tasks</option>
        </select>
        <select class="select input input-window input-window-selected">
          <option class="option">Any task</option>
          <option class="option">Tasks from my project</option>
          <option class="option">No other tasks</option>
        </select>
        <div class="input-action">X</div>
      </div>

      <p class="label">Result Transformers</p>
      <div class="input-group">
        <div class="input-action">⬆</div>
        <div class="input-action">⬇</div>
        <select class="select input input-window">
          <option class="option">Any task</option>
          <option class="option">Tasks from my project</option>
          <option class="option">No other tasks</option>
        </select>
        <select class="select input input-window">
          <option class="option">Any task</option>
          <option class="option">Tasks from my project</option>
          <option class="option">No other tasks</option>
        </select>
        <div class="input-action">X</div>
      </div>
      <div class="input-group">
        <div class="input-action">⬆</div>
        <div class="input-action">⬇</div>
        <select class="select input input-window">
          <option class="option">Any task</option>
          <option class="option">Tasks from my project</option>
          <option class="option">No other tasks</option>
        </select>
        <select class="select input input-window">
          <option class="option">Any task</option>
          <option class="option">Tasks from my project</option>
          <option class="option">No other tasks</option>
        </select>
        
        <div class="input-action">X</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#requestoptionssettings-container {
  height: 415px;
  width: 100%;
  background: #0059c1;
  // background: #137bf4;
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
.paper-grow {
  flex-grow: 1;
  overflow: auto;
  white-space: nowrap;
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
.label-dark {
  color: #04012e;
}

.select {
  background: #04012e;
  color: white;
  border-radius: 5px;
  padding: 2px;
  border-color: transparent;
  margin: 5px 0 10px 5px;
}
.select:focus {
  outline: none;
}

.result {
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
.result:focus {
  outline: none;
}

.spacer {
  height: 15px;
}

.input-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 5px;
}
.input {
  color: white;

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
  border-color: transparent;
}
.input:focus {
  outline: none;
}
.input-action {
  color: white;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  font-size: 0.5em;
  text-transform: uppercase;
  background: black;
  height: fit-content;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 5px 0 10px 5px;
  padding: 3px;

  border-radius: 3px;

  cursor:pointer;
}
</style>