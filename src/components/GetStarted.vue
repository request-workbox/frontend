<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom get-started-container">
        <div class="column column-data column-header-text column-grow get-started-header">Getting Started</div>
        <div class="column column-data column-header-text column-20">
          <a href="https://www.requestworkbox.com/blog" target="_blank">Visit the Blog</a>
        </div>
      </div>

      <!-- Projects -->
      <div class="row row-border-bottom get-started-heading">
        <div class="column column-data column-header-text column-grow">Projects</div>
      </div>
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow">
          <a href="https://www.requestworkbox.com/blog/how-to-create-a-new-project" target="_blank">How to Create a Project</a>
        </div>
      </div>
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow">
          <a href="https://www.requestworkbox.com/blog/how-to-delete-a-project" target="_blank">Delete a Project</a>
        </div>
      </div>

      <!-- Requests -->
      <div class="row row-border-bottom get-started-heading">
        <div class="column column-data column-header-text column-grow">Requests</div>
      </div>
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow">
          <a href="https://www.requestworkbox.com/blog/how-to-create-a-request" target="_blank">Create an HTTPS API Request</a>
        </div>
      </div>
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow">
          <a href="https://www.requestworkbox.com/blog/add-headers-to-a-request" target="_blank">Add Headers to a Request</a>
        </div>
      </div>

      <!-- Storage -->
      <div class="row row-border-bottom get-started-heading">
        <div class="column column-data column-header-text column-grow">Storage</div>
      </div>
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow">
          <a href="https://www.requestworkbox.com/blog/add-a-text-value-to-storage" target="_blank">Add a Text Value to Storage</a>
        </div>
      </div>
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow">
          <a href="https://www.requestworkbox.com/blog/add-a-json-file-to-storage" target="_blank">Store JSON Data</a>
        </div>
      </div>

    </div>
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
  background: #d7dbde;
}
.get-started-heading {
  padding-top: 10px !important;
  background: #e7eaec;
}
.get-started-header {
  font-size: 1em !important;
}
</style>