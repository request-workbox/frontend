<template>
  <div class="row">
    <div class="column column-full-width table-row-data-light">
      
      <div class="row row-border-bottom" v-for="(invite) in visibleInvites()" :key="invite._id">
        <div class="column account-column-data column-grow">
          <span class="text-13 text-weight-600">{{ invite.projectName }}</span>
          <span class="text-13"> invite from </span>
          <span class="text-13 text-weight-600">{{ invite.projectUsername }}</span>
        </div>
        <div class="column account-column-data">
          <div class="row">
            <div class="column text-button action"
              v-if="invite.status === 'invited'"
              v-on:click="acceptInviteAction(invite)">
                <span>Accept Invitation</span>
            </div>
            <div class="column text-button action"
              v-on:click="removeInviteAction(invite)">
                <span>Leave project</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'InvitesList',
  computed: {
    ...mapGetters('invites', ['visibleInvites']),
  },
  methods: {
    ...mapActions('invites', ['removeInvite','acceptInvite']),
    removeInviteAction: async function(invite) {
      try {
        const confirm = window.confirm('Are you sure you want to remove this invite?')
        if (confirm) {
          await this.removeInvite({ projectId: invite.projectId, username: invite.username, })
        }
      } catch(err) {
        console.log('Project list error', err.message)
      }
    },
    acceptInviteAction: async function(invite) {
      try {
        const confirm = window.confirm('Are you sure you want to accept this invite?')
        if (confirm) {
          await this.acceptInvite(invite.projectId)
        }
      } catch(err) {
        console.log('Project list error', err.message)
      }
    },
  }
};
</script>