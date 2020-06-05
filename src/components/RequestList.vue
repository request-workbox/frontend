<template>
  <div id="request-container">
    <div class="paper paper-dark">
      <div class="scrollmenu-header">
        <div class="scrollmenu-title scrollmenu-title-active">Requests</div>
        <div class="scrollmenu-title">Pre-request</div>
        <div class="scrollmenu-title">Post-request</div>
        <div class="scrollmenu-title">Transform Tasks</div>
      </div>
    </div>

    <div class="paper paper-light">
      <div class="detail-header">
        <p class="detail-header-text">Request Rules</p>
        <p class="detail-header-text detail-header-detail">Main Request</p>
        <p class="detail-header-text detail-header-detail">Receives Request</p>
        <p class="detail-header-text detail-header-detail">Accepts Request Template</p>
        <p class="detail-header-text detail-header-detail">Receives Response</p>
        <p class="detail-header-text detail-header-detail">Accepts Response Template</p>
      </div>
    </div>

    <div class="paper paper-dark">
      <p class="detail-header-text">Requests</p>
    </div>

    <div class="paper paper-dark paper-grow">
      <div class="rowmenu-header">
        <div class="rowmenu-title">Get Cat Photo</div>
        <div class="rowmenu-title">Get Dog Photo</div>
        <div class="rowmenu-title rowmenu-title-active">Get Dog Photo</div>
        <div class="rowmenu-title">Get Dog Photo</div>
        <div class="rowmenu-title">Get Dog Photo</div>
        <div class="rowmenu-title">Get Dog Photo</div>
        <div class="rowmenu-title">Get Dog Photo</div>
        <div class="rowmenu-title">Get Dog Photo</div>
        <div class="rowmenu-title">Get Dog Photo</div>
        <div class="rowmenu-title">Get Dog Photo</div>
        <div class="rowmenu-title">Get Dog Photo</div>
      </div>
    </div>

    <div class="paper paper-dark">
      <div class="create-button-container">
        <div class="create-button">Create Request</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

#request-container {
  height: 415px;
  width: 200px;
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
//   box-shadow: 1px 3px 0px 0px #161fdd;
}
.paper-light {
  background: #137bf4;;
//   box-shadow: 1px 3px 0px 0px #161fdd;
}
.paper-grow {
  flex-grow: 1;

  overflow: auto;
  white-space: nowrap;
}

.create-button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 10px 0;
}
.create-button {
  background: #b3daff;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  font-size: 0.8em;
  color: #000000;

  width: 80%;
  padding: 5px;
  text-align: center;
  border-radius: 3px;

  cursor: pointer;
}

.scrollmenu-header {
  overflow: auto;
  white-space: nowrap;
  height: 50px;
  margin: 10px 5px 0 15px;
}
.scrollmenu-title {
  display: inline-block;

  padding: 5px 15px;

  margin-top: 5px;

  color: #2ea3cb;
  background: #050030;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #050030;

  text-align: center;
  text-transform: uppercase;

  font-weight: 600;
  font-family: "Raleway", sans-serif;
  font-size: 0.8em;
  color: white;

  cursor: pointer;
}
.scrollmenu-title-active {
  background-color: #0061ef;
  color: white;

  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #0061ef;
}

.detail-header {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  margin: 0 0 10px 0;
}
.detail-header-text {
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  font-size: 0.7em;
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

.rowmenu-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //   margin: 10px 0;

  font-family: "Roboto", sans-serif;
}
.rowmenu-title {
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;
  border-color: #0061ef;

  padding: 7px 7px;

  color: #070031;
  background: #039aff;

  width: 85%;

  text-align: left;
  text-transform: none;

  font-weight: 600;
  font-family: "Roboto", sans-serif;
  font-size: 0.7em;

  margin: 2px 0;

  cursor: pointer;
}
.rowmenu-title-active {
  background-color: #007bec;
  color: white;
}
</style>