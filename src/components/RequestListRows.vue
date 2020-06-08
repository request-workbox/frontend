<template>
  <div id="requestlistrows-container">
    <div class="paper paper-dark">
      <p class="label">List</p>
      <div class="input-group">
        <input type="text" class="input small" placeholder="Method" disabled value="GET" />
        <input type="text" class="input small" placeholder="Request Name" disabled value="Get Cat Photo" />
        <input type="text" class="input medium" placeholder="URL" disabled />
        <input type="text" class="input" placeholder="Success Codes" disabled />
      </div>
      <div class="input-group">
        <input type="text" class="input small" placeholder="Method" disabled value="POST" />
        <input type="text" class="input small" placeholder="Request Name" disabled value="Get Dog Photo" />
        <input type="text" class="input medium" placeholder="URL" disabled />
        <input type="text" class="input" placeholder="Success Codes" disabled />
      </div>
      <div class="input-group">
        <input type="text" class="input small" placeholder="Method" disabled />
        <input type="text" class="input small" placeholder="Request Name" disabled />
        <input type="text" class="input medium" placeholder="URL" disabled />
        <input type="text" class="input" placeholder="Success Codes" disabled />
      </div>
      <div class="input-group">
        <input type="text" class="input small" placeholder="Method" disabled />
        <input type="text" class="input small" placeholder="Request Name" disabled />
        <input type="text" class="input medium" placeholder="URL" disabled />
        <input type="text" class="input" placeholder="Success Codes" disabled />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#requestlistrows-container {
  height: auto;
  width: 100%;
  background: #0059c1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.paper {
  width: 100%;
}
.paper-dark {
  background: #04002d;
}

.label {
  color: #9bc2fa;

  font-weight: 600;
  font-family: "Raleway", sans-serif;
  font-size: 0.6em;

  text-transform: uppercase;

  padding: 5px 0 5px 5px;
  margin: 0;
}
.label-dark {
  color: #04012e;
}

.input-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  background:#111d39;
}
.input-group:nth-child(even) {
  background: #182543;
}
.input {
  color: #a7c3da;

  font-weight: 400;
  font-family: "Roboto", sans-serif;
  font-size: 0.65em;

  width: 100%;

  text-align: left;

  padding: 5px 3px;

  border: none;

  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: #1d1f21;

  background:transparent;
}
.input:focus {
  outline: none;
}



.small {
  max-width: 10%;
}
.medium {
  max-width: 20%;
}
</style>