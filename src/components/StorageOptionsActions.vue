<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelStorageChangesAction">
                Cancel
              </div>
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="saveStorageChangesAction">
                Save Changes
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'StorageOptionsActions',
  computed: {
    ...mapState('storage', ['editing']),
    ...mapGetters('storage', ['selectedStorage']),
  },
  methods: {
    ...mapActions('storage', ['cancelStorageChanges', 'saveStorageChanges']),
    cancelStorageChangesAction: async function() {
      try {
        const storage = await this.cancelStorageChanges({ _id: this.selectedStorage()._id })
      } catch(err) {
        console.log('Storage options actions error', err.message)
      }
    },
    saveStorageChangesAction: async function() {
      try {
        const storage = await this.saveStorageChanges(this.selectedStorage())
      } catch(err) {
        console.log('Storage options actions error', err.message)
      }
    },
  }
};
</script>