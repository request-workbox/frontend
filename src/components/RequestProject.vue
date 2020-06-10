<template>
    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row">
          <div class="column input-hover">
            <input class="input-text" type="text" :value="projectNameValue" id="project-name-input" />
          </div>
          <div class="column text-button" id="project-share-button">Share</div>
          <div class="column text-button" id="project-team-button">Team</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'RequestProject',
  props: ['projectName'],
  computed: {
    projectNameValue: function() {
      return this.projectName || 'Project Name'
    }
  }
}
</script>