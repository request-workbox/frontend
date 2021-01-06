<template>
    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column text-button text-button-and-logo" v-on:click="createStorageAction('text')">
            <img src="/file-2.svg" alt="">
            <span>New Text Storage</span>
          </div>
          <div class="column text-button text-button-and-logo" v-on:click="createStorageAction('file')">
            <img src="/file.svg" alt="">
            <span>New File Storage</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'StorageMenu',
  computed: {
    ...mapState('project', ['selectedProjectId'])
  },
  methods: {
    ...mapActions('storage', ['createStorage']),
    createStorageAction: async function(storageType) {
      try {
        const storage = await this.createStorage({ projectId: this.selectedProjectId, storageType })
      } catch(err) {
        console.log('Storage menu error', err.message)
      }
    },
  }
}
</script>