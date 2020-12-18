<template>
    <div class="row row-justify-between row-border-bottom">
      <div class="column column-full-width">

        <div class="row row-border-bottom row-dark">
          <div class="column text-button text-button-selected">Settings</div>
          <div class="column text-button">Team</div>
        </div>

        <div class="row row-border-bottom" v-if="this.option === 'settings'">
          <div
            class="column text-button action"
          >Cancel</div>
          <div
            class="column text-button action"
          >Save Changes</div>
        </div>

        <div class="row">
          <keep-alive>
            <component :is="`ProjectSettings${upperFirstOption}`" v-if="this.option !== ''"></component>
          </keep-alive>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'

import ProjectSettingsSettings from './ProjectSettingsSettings'
// import ProjectSettingsTeam from './ProjectSettingsTeam'

export default {
  name: 'ProjectSettings',
  components: {
    ProjectSettingsSettings,
    // ProjectSettingsTeam,
  },
  computed: {
    ...mapState('project', ['option']),
    upperFirstOption: function() {
      return _.upperFirst(this.option)
    }
  }
}
</script>