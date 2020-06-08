<template>
  <div id="workflowdetails-container">

    <div class="workflowdetailsaction-container">
      <div class="workflowdetailsaction">Cancel</div>
      <div class="workflowdetailsaction workflowdetailsaction-active">Save</div>
    </div>

    <div class="workflowdetailsaction-container">
      <div class="workflowdetailslink workflowdetailslink-active" v-on:click="selectedAction = 'Template'">Template</div>
      <div class="workflowdetailslink" v-on:click="selectedAction = 'Settings'">Settings</div>
    </div>

    <keep-alive>
        <component :is="`Workflow${selectedAction}`"></component>
      </keep-alive>

  </div>
</template>

<script>
import WorkflowTemplate from "./WorkflowTemplate";
import WorkflowSettings from "./WorkflowSettings";

export default {
  name: "WorkflowDetails",
  data: function() {
    return {
      selectedAction: 'Template'
    }
  },
  components: {
    WorkflowTemplate,
    WorkflowSettings,
  }
};
</script>

<style lang="scss">
#workflowdetails-container {
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;

  width: 100%;
  // max-width: 1200px;
}

.workflowdetailsaction-container {
  display:flex;
}

.workflowdetailsaction {
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
.workflowdetailsaction-active {
  background: #4caf50;
  color: white;
}

.workflowdetailslink {
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 0.7em;
  color:#9bc2fa;

  margin: 15px 15px 15px 15px;

  cursor: pointer;
}

.workflowdetailslink-active {
  color: white;
  font-weight: 700;
}


</style>