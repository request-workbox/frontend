<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Description</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Project Name"
            disabled
          />
        </div>
        <div class="column column-data column-15">
          <input
            type="text"
            class="column-input-text"
          />
        </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Permissions</div>
      </div>

      <div class="row row-border-bottom row-align-start">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Return Workflow"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input type="radio" id="owner" name="permission" value="owner">
          <label for="owner">Owner</label>
          <input type="radio" id="team" name="permission" value="team">
          <label for="team">Team</label>
          <input type="radio" id="public" name="permission" value="public">
          <label for="public">Public (allow unauthenticated requests)</label>
        </div>
      </div>

      <div class="row row-border-bottom row-align-start">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Queue Workflow"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input type="radio" id="owner" name="permission" value="owner">
          <label for="owner">Owner</label>
          <input type="radio" id="team" name="permission" value="team">
          <label for="team">Team</label>
          <input type="radio" id="public" name="permission" value="public">
          <label for="public">Public (allow unauthenticated requests)</label>
        </div>
      </div>

      <div class="row row-border-bottom row-align-start">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Schedule Workflow"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input type="radio" id="owner" name="permission" value="owner">
          <label for="owner">Owner</label>
          <input type="radio" id="team" name="permission" value="team">
          <label for="team">Team</label>
          <input type="radio" id="public" name="permission" value="public">
          <label for="public">Public (allow unauthenticated requests)</label>
        </div>
      </div>

      <div class="row row-border-bottom row-align-start">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Statuscheck Workflow"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input type="radio" id="owner" name="permission" value="owner">
          <label for="owner">Owner</label>
          <input type="radio" id="team" name="permission" value="team">
          <label for="team">Team</label>
          <input type="radio" id="public" name="permission" value="public">
          <label for="public">Public (allow unauthenticated requests)</label>
        </div>
      </div>

      <div class="row row-border-bottom row-align-start">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Webhook Endpoint"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input type="radio" id="owner" name="permission" value="owner">
          <label for="owner">Owner</label>
          <input type="radio" id="team" name="permission" value="team">
          <label for="team">Team</label>
          <input type="radio" id="public" name="permission" value="public">
          <label for="public">Public (allow unauthenticated requests)</label>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'

export default {
  name: "ProjectSettingsSettings",
};
</script>

<style lang="scss">
label {
  margin-right: 15px;
}
</style>