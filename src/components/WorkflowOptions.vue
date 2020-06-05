<template>
  <div id="workflowoptions-container">
    <div class="paper paper-light">
      <div class="detail-header">
        <input type="text" class="input-workflow detail-header-text" />
        <p
          class="detail-header-text detail-header-detail"
        >Workflow available at https://api.com/workflow/workflowname</p>
      </div>
    </div>

     <div class="paper paper-dark">
      <p class="label">Task Timeout</p>
      <input type="text" class="input-timeout" />
      <p class="label">Repeat Task Per Task Path</p>
      <input type="text" class="input-timeout" />
    </div>

    <div class="paper paper-light paper-grow">
      <p class="label">On Task Timeout</p>
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

#workflowoptions-container {
  height: 250px;
  width: 350px;
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



.detail-header {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  margin: 0 0 10px 0;
}
.detail-header-text {
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  font-size: 0.9em;
  padding: 6px 0 0 10px;
  margin: 0;
  text-transform: uppercase;
  color: #99cffe;
}
.detail-footer-text {
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  font-size: 0.7em;
  padding: 4px 0 0 10px;
  margin: 0 0 5px 0;
  text-transform: uppercase;
  color: white;
}
.detail-header-detail {
  padding: 4px 0 0 15px;
  color: #cdfffe;
  font-size: 0.6em;
}

.input-workflow {
  width: 97%;

  background: #ffffff00;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #ffffff00;

  color: #04012e;

  padding: 5px;
  margin: 0 0 0 5px;
}
.input-workflow:focus {
  outline: none;
}




.input-timeout {
  width: 97%;

  background: #ffffff00;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #ffffff00;

  color: #dde3ff;

  font-size: 0.8em;
  font-weight: 400;
  font-family: "Roboto", sans-serif;

  padding: 5px;
  margin: 0;
}
.input-timeout:focus {
  outline: none;
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



</style>