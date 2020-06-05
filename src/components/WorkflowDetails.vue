<template>
  <div id="workflowdetails-container">
    <div class="paper paper-dark paper-grow">
      <p class="label">Workflow</p>

      <div class="input-group">
        <div class="input-action">⬆</div>
        <div class="input-action">⬇</div>
        <div class="input-details">
          <div class="input-group">
            <input
              type="text"
              class="input input-window input-window-selected input-window-left"
              value="Task Name"
              disabled
            />
            <input
              type="text"
              class="input input-window input-window-selected"
              value="Get Cat Photo"
              disabled
            />
          </div>
        </div>
        <div class="input-action">X</div>
      </div>
    </div>

    <div class="paper paper-light">
      <p class="label">Add Task</p>
      <select class="select">
        <option class="option">Any task</option>
        <option class="option">Tasks from my project</option>
        <option class="option">No other tasks</option>
      </select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

#workflowdetails-container {
  height: 250px;
  width: 650px;
  background: #0059c1;
  display: flex;
  flex-direction: column;
  align-items: center;
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

  background: #277bf4;

  width: 100%;

  text-align: left;

  padding: 3px 3px;

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

  cursor: pointer;
}

.input-details {
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  font-size: 0.5em;

  background: #ffc94c;
  color: white;

  border-radius: 3px;

  width: 80%;


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
.input-window-left {
    width: 30%;
}

</style>