<template>
  <div class="column-full-width">
    <!-- Getting Started -->
      <div class="row row-border-bottom get-started-container">
        <div class="column column-data column-header-text column-grow get-started-header">Getting Started</div>
      </div>

      <!-- Create a project -->
      <h4 class="get-started-header">How to Create a Project</h4>
      <h6 class="get-started-subheader">
        Create an unlimited number of projects to organize and categorize requests.
        <span><a href="https://www.requestworkbox.com/blog/how-to-create-a-new-project" target="_blank">Learn more</a></span>
      </h6>

      <!-- How to Archive a Project -->
      <h4 class="get-started-header">How to Archive a Project</h4>
      <h6 class="get-started-subheader">
        Delete an entire project to clear project drafts and archived requests.
        <span><a href="https://www.requestworkbox.com/blog/how-to-delete-a-project" target="_blank">Learn more</a></span>
      </h6>

      <!-- Working with Requests -->
      <div class="row row-border-bottom get-started-container">
        <div class="column column-data column-header-text column-grow get-started-header">Working with Requests</div>
      </div>

      <!-- Create an HTTPS API Request -->
      <h4 class="get-started-header">Create an HTTPS API Request</h4>
      <h6 class="get-started-subheader">
        Create an unlimited number of requests to access public and private endpoints within a workflow.
        <span><a href="https://www.requestworkbox.com/blog/how-to-create-a-request" target="_blank">Learn more</a></span>
      </h6>

      <!-- Add Headers to a Request -->
      <h4 class="get-started-header">Add Headers to a Request</h4>
      <h6 class="get-started-subheader">
        Edit the headers, parameters, and body that are sent with a request during the workflow.
        <span><a href="https://www.requestworkbox.com/blog/add-headers-to-a-request" target="_blank">Learn more</a></span>
      </h6>

      <!-- Storing Data -->
      <div class="row row-border-bottom get-started-container">
        <div class="column column-data column-header-text column-grow get-started-header">Storing Data</div>
      </div>

      <!-- Add a Text Value to Storage -->
      <h4 class="get-started-header">Add a Text Value to Storage</h4>
      <h6 class="get-started-subheader">
        Store key-value headers, parameters, or body fields in Storage for use within a request during a workflow.
        <span><a href="https://www.requestworkbox.com/blog/add-a-text-value-to-storage" target="_blank">Learn more</a></span>
      </h6>

      <!-- Store JSON Data -->
      <h4 class="get-started-header">Store JSON Data</h4>
      <h6 class="get-started-subheader">
        Pass a Text or JSON file to headers, parameters, or body fields of a request.
        <span><a href="https://www.requestworkbox.com/blog/add-a-json-file-to-storage" target="_blank">Learn more</a></span>
      </h6>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "GetStarted",
};
</script>

<style lang="scss">
.get-started-container {
  padding-top:45px !important;
  background: #f9f9f9;
}
.get-started-heading {
  padding-top: 10px !important;
  background: #e7eaec;
}
.get-started-header {
    font-size: 15px !important;
    font-weight: 600!important;
    padding: 0!important;
    margin: 15px 5px 0 5px!important;
}
.get-started-subheader {
    font-size: 13px !important;
    font-weight: 500 !important;
    padding: 0!important;
    margin: 0 5px!important;
}
</style>