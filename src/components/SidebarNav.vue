<template>
  <div id="sidebarnav-container">
    <div class="paper paper-dark">
        <p class="label">Navigation</p>
      <div class="rowmenu">
        <div class="rowmenu-link">Projects</div>
        <div class="rowmenu-link">Teams</div>
        <div class="rowmenu-link rowmenu-link-active">Requests</div>
        <div class="rowmenu-link">Workflows</div>
        <div class="rowmenu-link">Instances</div>
        <div class="rowmenu-link">Settings</div>
        <div class="rowmenu-link">Help/Contact</div>
        <div class="rowmenu-link">About</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

#sidebarnav-container {
  height: auto;
  width: 100%;

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

  padding: 5px 0 0 5px;
  margin: 0;
}

.rowmenu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: "Lato", sans-serif;
}
.rowmenu-link {
//   border-radius: 2px;
//   border-width: 1px;
//   border-style: solid;
//   border-color: transparent;

  color: #b3daff;
//   background: #039aff;

  width: 100%;

  text-align: left;
  text-transform: none;

  font-weight: 700;
  font-size: 0.7em;

  cursor: pointer;

  padding: 10px 0 10px 20px;
}
.rowmenu-link-active {
  background-color: #007bec;
  color: white;
}
</style>