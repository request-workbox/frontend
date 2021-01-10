<template>
  <div class="row">
    <div class="column column-full-width table-row-data-light">
      
      <ProjectToolbar />

      <div v-if="projectOption === 'owner'">
        <div class="row row-border-bottom">
          <div class="column column-data column-header-text column-grow column-group-header">My Projects</div>
        </div>

        <div class="row row-border-bottom">
          <div class="column column-data column-header-text column-grow">Project Name</div>
          <div class="column column-data column-header-text column-20">Project ID</div>
          <div class="column column-data column-header-text column-20">Date Created</div>
        </div>

        <div class="row row-border-bottom project-row" v-bind:class="{'project-row-selected':shouldBeSelected(project._id)}" v-for="(project) in visibleProjects()" :key="project._id" v-on:click="selectOrDeselectRowAction(project)">
          <div class="column column-data column-grow">{{ project.name }}</div>
          <div class="column column-data column-20">{{ project._id }}</div>
          <div class="column column-data column-20">{{ projectCreatedAt(project.createdAt) }}</div>
        </div>
      </div>

      <div v-if="projectOption === 'team'">
        <div class="row row-border-bottom">
          <div class="column column-data column-header-text column-grow column-group-header">Team Projects</div>
        </div>

        <div class="row row-border-bottom">
          <div class="column column-data column-header-text column-grow">Project Name</div>
          <div class="column column-data column-header-text column-20">Project ID</div>
          <div class="column column-data column-header-text column-20">Date Created</div>
        </div>

        <div class="row row-border-bottom project-row" v-bind:class="{'project-row-selected':shouldBeSelected(project._id)}" v-for="(project) in visibleProjects()" :key="project._id" v-on:click="selectOrDeselectRowAction(project)">
          <div class="column column-data column-grow">{{ project.name }}</div>
          <div class="column column-data column-20">{{ project._id }}</div>
          <div class="column column-data column-20">{{ projectCreatedAt(project.createdAt) }}</div>
        </div>
      </div>

      <div v-if="projectOption === 'invites'">
        <div class="row row-border-bottom">
          <div class="column column-data column-header-text column-grow column-group-header">Project Invites</div>
        </div>

        <div class="row row-border-bottom project-row-light" v-for="(invite) in visibleInvites()" :key="invite._id">
          <div class="column column-data column-grow">{{ invite.projectName }} invite from {{ invite.projectUsername }}</div>
          <div class="column column-data">
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
  </div>
</template>

<script>
import ProjectToolbar from './ProjectToolbar'

import moment from 'moment-timezone'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProjectList',
  components: {
    ProjectToolbar,
  },
  computed: {
    ...mapState('project', ['selectedProjectId','projectOption']),
    ...mapGetters('project', ['visibleProjects']),
    ...mapGetters('invites', ['visibleInvites']),
  },
  methods: {
    ...mapActions('project', ['selectOrDeselectRow']),
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
    selectOrDeselectRowAction: function(project) {
      this.selectOrDeselectRow(project)
    },
    shouldBeSelected: function(projectId) {
      if (projectId === this.selectedProjectId) return true
      else return false
    },
    projectCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm a')}`
    }
  }
};
</script>