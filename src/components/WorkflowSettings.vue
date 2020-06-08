<template>
  <div id="workflowcontext-container">
    <div class="paper paper-dark paper-grow">
      <p class="label">Task Name</p>
      <div class="input-group">
        <input type="text" class="input input-window input-window-selected" value="Timeout" disabled />
        <input
          type="text"
          class="input input-window input-window-selected"
          value="30"
        />
      </div>
      <div class="input-group">
        <input type="text" class="input input-window input-window-selected" value="Repeat Path" disabled />
        <input
          type="text"
          class="input input-window input-window-selected"
          value="getDogPhoto.results"
        />
      </div>
      <div class="input-group">
        <input type="text" class="input input-window input-window-selected" placeholder="Key" />
        <input
          type="text"
          class="input input-window input-window-selected"
          placeholder="Value/Path"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

#workflowcontext-container {
  height: 315px;
  width: 100%;
  max-width: 750px;

  background: #0059c1;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 5px;
  
  // padding: 15px 15px;
  // margin: 15px;
}

.paper {
  //   display: flex;
  //   flex-direction: column;
  //   align-content: flex-start;

  width: 97%;
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



.input-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background:#fbc94c;
}
.input {
  color: #888888;

  font-weight: 400;
  font-family: "Roboto", sans-serif;
  font-size: 0.65em;

  background: #050023;

  width: 100%;

  text-align: left;

  padding: 3px 3px;

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