<template>
  <div id="requestdetails-container">

    <div class="requestdetailsaction-container">
      <div class="requestdetailsaction">Cancel</div>
      <div class="requestdetailsaction requestdetailsaction-active">Save</div>
    </div>

    <div class="requestdetailsaction-container">
      <div class="requestdetailslink requestdetailslink-active">Template</div>
      <div class="requestdetailslink">Settings</div>
      <div class="requestdetailslink">Transformers</div>
      <div class="requestdetailslink">Permissions</div>
    </div>

    <RequestTemplate />
    <RequestSettings />
    <RequestTransformers />
    <RequestPermissions />

  </div>
</template>

<script>
import RequestTemplate from "./RequestTemplate";
import RequestSettings from "./RequestSettings";
import RequestTransformers from './RequestTransformers'
import RequestPermissions from './RequestPermissions'

export default {
  name: "RequestDetails",
  components: {
    RequestTemplate,
    RequestSettings,
    RequestTransformers,
    RequestPermissions,
  }
};
</script>

<style lang="scss">
#requestdetails-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  width: 100%;
  // max-width: 1200px;
}

.requestdetailsaction-container {
  display:flex;
}

.requestdetailsaction {
  background: #76838d;
  color: black;

  width: fit-content;

  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 0.7em;

  border-radius: 5px;

  text-transform: uppercase;

  padding: 5px 15px;
  margin: 15px 15px 5px 5px;

  cursor: pointer;

  height: fit-content;
}
.requestdetailsaction-active {
  background: #4caf50;
  color: white;
}

.requestdetailslink {
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 0.7em;
  color:#9bc2fa;

  margin: 15px 15px 15px 15px;

  cursor: pointer;
}

.requestdetailslink-active {
  color: white;
  font-weight: 700;
}


</style>