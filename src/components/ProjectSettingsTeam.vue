<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Invite</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-10">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Enter Username"
            disabled
          />
        </div>
        <div class="column column-data column-15">
          <input
            type="text"
            class="column-input-text"
            placeholder="username"
          />
        </div>
        <div class="column text-button action">Send Invite</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Users</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-10">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="username"
            disabled
          />
        </div>
        <div class="column column-data column-15">
          <select class="column-input-select border-hidden column-input-select-stretch">
              <option value="textInput">Read</option>
              <option value="storage">Read/Write</option>
            </select>
        </div>
        <div class="column column-data column-grow">
          <input type="checkbox" id="team" name="permission" value="team">
          <label for="team">Include sensitive</label>
        </div>
        <div class="column text-button action">Remove</div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'

export default {
  name: "ProjectSettingsTeam",
};
</script>

<style lang="scss">
label {
  margin-right: 15px;
}
</style>