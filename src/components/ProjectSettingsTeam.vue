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
            v-model="username"
          />
        </div>
        <div class="column text-button action" v-on:click="createInviteAction">Send Invite</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Users</div>
      </div>

      <div class="row row-border-bottom" v-for="(member) in visibleTeam()" :key="member._id">
        <div class="column column-data column-10">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="member.username"
            disabled
          />
        </div>
        <div class="column column-data column-15">
          <select class="column-input-select border-hidden column-input-select-stretch"
            :value="member.permission"
            :disabled="member.owner"
            @change="updatePermissionAction(member._id, $event)">
              <option value="read">Read</option>
              <option value="write">Read/Write</option>
            </select>
        </div>
        <div class="column column-data column-10" >
          <input 
            :disabled="member.owner"
            type="checkbox"
            :id="member._id"
            :checked="member.includeSensitive"
            @change="updateIncludeSensitiveAction(member._id, $event)">
          <label :for="member._id">Include sensitive</label>
        </div>
        <div class="column column-data column-grow" v-if="!member.owner">
          {{ upperFirst(member.status) }}
        </div>
        <div class="column text-button action" v-if="!member.owner" v-on:click="removeInviteAction(member.username)">Remove</div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: 'ProjectSettingsTeam',
  data: function() {
    return {
      username: ''
    }
  },

  computed: {
    ...mapState('project', ['selectedProjectId']),
    ...mapGetters('team', ['visibleTeam']),
  },
  methods: {
    ...mapMutations('team', ['updateIncludeSensitive', 'updatePermission']),
    ...mapActions('team', ['createInvite','removeInvite']),
    createInviteAction: async function() {
      try {
        await this.createInvite({ projectId: this.selectedProjectId, username: this.username })
      } catch(err) {
        console.log('Project settings team error', err.message)
      }
    },
    upperFirst: function(string) {
      return _.upperFirst(string)
    },
    removeInviteAction: async function(username) {
      try {
        const confirm = window.confirm('Are you sure you want to remove this team member?')
        if (confirm) {
          await this.removeInvite({ projectId: this.selectedProjectId, username, })
        }
      } catch(err) {
        console.log('Project settings team error', err.message)
      }
    },
    updateIncludeSensitiveAction: function(memberId, event) {
      const value = event.target.checked
      this.updateIncludeSensitive({ memberId, value, })
    },
    updatePermissionAction: function(memberId, event) {
      const value = event.target.value
      this.updatePermission({ memberId, value, })
    },
  }
};
</script>

<style lang="scss">
label {
  margin-right: 15px;
}
</style>