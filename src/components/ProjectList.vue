<template>
  <div class="row">
    <div class="column column-full-width table-row-data-light">
      
      <ProjectToolbar />

      <div v-if="projectTypeOption === 'owner'">
        <div class="row row-border-bottom">
          <div class="column column-data column-header-text column-grow column-group-header">My Projects</div>
        </div>

        <div class="row row-border-bottom">
          <div class="column column-data column-header-text column-grow">Project Name</div>
          <div class="column column-data column-header-text column-20">Project ID</div>
          <div class="column column-data column-header-text column-20">Date Created</div>
        </div>

        <div class="row row-border-bottom project-row" v-bind:class="{'project-row-selected':shouldBeSelected(project._id)}" v-for="(project) in finalData(this.projectTypeOption)" :key="project._id" v-on:click="selectProjectAction(project._id)">
          <div class="column column-data column-grow">{{ project.name }}</div>
          <div class="column column-data column-20">{{ project._id }}</div>
          <div class="column column-data column-20">{{ projectCreatedAt(project.createdAt) }}</div>
        </div>
      </div>

      <div v-if="projectTypeOption === 'team'">
        <div class="row row-border-bottom">
          <div class="column column-data column-header-text column-grow column-group-header">Team Projects</div>
        </div>

        <div class="row row-border-bottom">
          <div class="column column-data column-header-text column-grow">Project Name</div>
          <div class="column column-data column-header-text column-20">Project ID</div>
          <div class="column column-data column-header-text column-20">Date Created</div>
        </div>

        <div class="row row-border-bottom project-row" v-bind:class="{'project-row-selected':shouldBeSelected(project._id)}" v-for="(project) in finalData(this.projectTypeOption)" :key="project._id" v-on:click="selectProjectAction(project._id)">
          <div class="column column-data column-grow">{{ project.name }}</div>
          <div class="column column-data column-20">{{ project._id }}</div>
          <div class="column column-data column-20">{{ projectCreatedAt(project.createdAt) }}</div>
        </div>
      </div>

      <div v-if="projectTypeOption === 'invites'">
        <div class="row row-border-bottom">
          <div class="column column-data column-header-text column-grow column-group-header">Project Invites</div>
        </div>

        <div class="row row-border-bottom project-row-light" v-for="(invite) in inviteData()" :key="invite._id">
          <div class="column column-data column-grow">{{ invite.projectName }} invite from {{ invite.projectUsername }}</div>
          <div class="column column-data">
            <div class="row">
              <div class="column text-button action"
                v-if="invite.status === 'invited'"
                v-on:click="acceptInviteAction(invite)">
                  <span>Accept Invitation</span>
              </div>
              <div class="column text-button action"
                v-if="invite.status === 'accepted'"
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
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "ProjectList",
  components: {
    ProjectToolbar,
  },
  computed: {
    ...mapState("project", ["projects",'projectId','projectTypeOption']),
    ...mapGetters('project', ['finalData','inviteData',])
  },
  methods: {
    ...mapMutations('project', ['changeProjectId']),
    ...mapActions('project',['removeInvite','acceptInvite']),
    navigateToRoute: function(route, projectId) {
      location.assign(`/projects/${projectId}/${route}`)
    },
    removeInviteAction: async function(invite) {
      try {
        const confirm = window.confirm('Are you sure you want to remove this invite?')
        if (confirm) {
          this.removeInvite({ projectId: invite.projectId, username: invite.username, })
        }
      } catch(err) {
        console.log(err)
      }
    },
    acceptInviteAction: async function(invite) {
      try {
        const confirm = window.confirm('Are you sure you want to accept this invite?')
        if (confirm) {
          this.acceptInvite(invite.projectId)
        }
      } catch(err) {
        console.log(err)
      }
    },
    selectProjectAction: function(projectId) {
      if (projectId === this.projectId) return this.changeProjectId({ projectId: '' })
      else return this.changeProjectId({ projectId: projectId })
    },
    shouldBeSelected: function(projectId) {
      if (projectId === this.projectId) return true;
      else return false;
    },
    projectCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm a')}`
    }
  }
};
</script>