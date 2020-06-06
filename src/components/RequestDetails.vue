<template>
  <div id="requestdetails-container">
    <div class="requestdetails-row">
      <RequestDetailsState />
      <RequestDetailsTemplate />
    </div>
    <div class="requestdetails-row">
      <!-- <RequestDetailsOptions /> -->
    </div>
  </div>
</template>

<script>
import RequestDetailsState from "./RequestDetailsState";
import RequestDetailsTemplate from "./RequestDetailsTemplate";


export default {
  name: "RequestDetails",
  components: {
    RequestDetailsState,
    RequestDetailsTemplate,
    // RequestDetailsOptions
  }
};
</script>

<style lang="scss">
#requestdetails-container {
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 1200px;
}
.requestdetails-row {
  display: flex;
  flex-direction: row;
}
</style>