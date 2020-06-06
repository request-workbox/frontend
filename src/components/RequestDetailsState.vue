<template>
  <div id="requestdetailsstate-container">
    <div class="paper paper-dark">
      <p class="label">Request title</p>
      <input type="text" class="request-title" />
    </div>

    <div class="paper paper-dark">
      <p class="label">Success Codes</p>
      <input type="text" class="request-title request-title-success" />
    </div>

    <div class="paper paper-dark">
      <p class="label">Error Codes</p>
      <input type="text" class="request-title request-title-error" />
    </div>

    <!-- <div class="paper paper-light">
      <p class="label">Active State</p>
      <div class="button-group">
        <div class="button button-left button-active">Active</div>
        <div class="button button-right">Inactive</div>
      </div>
    </div>

    <div class="paper paper-light">
      <p class="label">Request Type</p>
      <div class="button-group">
        <div class="button button-left button-active">Request</div>
        <div class="button button-right">Transform</div>
      </div>
    </div>

    <div class="paper paper-light">
      <p class="label">Transform Type</p>
      <div class="button-group">
        <div class="button button-left button-active">Request</div>
        <div class="button button-center">Response</div>
        <div class="button button-right">Task</div>
      </div>
    </div> -->

    <div class="paper paper-dark">
      <p class="label">Description</p>
      <textarea class="request-description"></textarea>
    </div>

    <RequestDetailsOptions />

  </div>
</template>

<script>
import RequestDetailsOptions from "./RequestDetailsOptions";

export default {
  components: {
    RequestDetailsOptions,
  }
}
</script>

<style lang="scss" scoped>
#requestdetailsstate-container {
  height: auto;
  width: 100%;
  background: #0059c1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.paper {
  width: 97%;
  margin-top: 5px;
  border-radius: 5px;
}
.paper-dark {
  background: #04002d;
}
.paper-light {
  background: #137bf4;
  margin: 5px 0;
}
.paper-grow {
  flex-grow: 1;
  margin-bottom: 5px;

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

.request-description {
  width: 96%;
  padding: 5px;
  margin: 0;

  background: #ffffff00;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #ffffff00;

  color: #dde3ff;

  font-weight: 400;
  font-family: "Roboto", sans-serif;
  font-size: 0.7em;

  resize:none;
  height:75px;
  min-width: 96%;
  max-width: 96%;
}
.request-description:focus {
  outline: none;
}

.request-title {
  width: 97%;

  background: #ffffff00;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #ffffff00;

  color: #dde3ff;

  font-weight: 600;
  font-family: "Raleway", sans-serif;
  font-size: 1em;

  padding: 5px;
  margin: 0;
}
.request-title-success {
  color: #81ca81;
  font-size: 0.8em;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
}
.request-title-error {
  color: #db7373;
  font-size: 0.8em;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
}
.request-title:focus {
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
  font-size: 0.8em;

  text-transform: uppercase;

  background:#050023;

  width: 100%;

  text-align: center;

  margin-top:5px;
  padding: 3px 0;

  cursor:pointer;
}
.button-left {
    border-radius: 4px 0 0 4px;
}
.button-right {
    border-radius: 0 4px 4px 0;
}
.button-active {
    background: #4CAF50;
    color: white;
}
</style>