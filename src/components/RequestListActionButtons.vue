<template>
  <div id="requestlistactionbuttons-container">
    <div class="paper paper-dark">
      <p class="label">Request Actions</p>
    </div>

    <div class="paper row">
      <div class="action">Create Request</div>
      <!-- <div class="action action-green">Activate</div>
      <div class="action action-yellow">Deactivate</div>
      <div class="action action-pink action-small">Refresh</div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#requestlistactionbuttons-container {
  height: auto;
  width: 100%;
  background: #0059c1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.paper {
  width: 100%;

  padding: 5px 0 5px 0;

}
.paper-dark {
  background: #04002d;
}
.paperlight-dark {
  background: #182543;
}

.row {
    display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  background:#04012e;
}

.label {
  color: #9bc2fa;

  font-weight: 600;
  font-family: "Raleway", sans-serif;
  font-size: 0.6em;

  text-transform: uppercase;

  padding: 0 0 0 5px;
  margin: 0;
}

.action {
  background: #1976d2;
  color: white;

  width: fit-content;

  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 0.7em;

  border-radius: 5px;

  text-transform: uppercase;

  padding: 5px 15px;
  margin: 5px 15px 5px 5px;

  cursor: pointer;

  height: fit-content;
}
.action-green {
  background: #4caf50;
}
.action-yellow {
  background: #e6ae21;
}
.action-pink {
  background: #e972ae;
}
.action-small {
  font-size: 0.6em;
  padding: 4px 8px;
}
</style>