<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom row-border-bottom-tall">
        <div class="column column-data column-header-text column-20 padding-10">Type</div>
        <div class="column column-data column-header-text column-grow padding-10">Configuration</div>
      </div>

      <div class="row row-border-bottom row-border-bottom-tall row-align-start">
        <div class="column column-data column-20 padding-10 break-spaces">
          <select class="column-input-select column-input-select-stretch" 
            :value="this.authorizationType" 
            v-on:input="editAuthorizationTypeAction($event)">
            <option value="noAuth">No Auth</option>
            <option value="basicAuth">Basic Auth</option>
          </select>
          <p>The authorization header will be automatically generated when you send the request. Learn more about authorization</p>
        </div>
        <div class="column column-data column-full-width column-grow">

            <div class="row row-border-bottom" v-if="this.authorizationType === 'basicAuth'">
              <div class="column column-data column-10">
                <input
                  disabled
                  type="text"
                  value="Username"
                  class="column-input-select border-hidden column-input-select-stretch"
                />
              </div>
              <div class="column column-data column-10">
                <select 
                  class="column-input-select border-hidden column-input-select-stretch"
                  :value="this.authorizationUsername.valueType"
                  v-on:input="editAuthorizationValueTypeAction('valueType', this.authorizationUsername._id, $event)">
                    <option value="textInput">Text Input</option>
                    <option value="storage">Storage</option>
                    <option value="runtimeResult">Runtime Result</option>
                    <option value="incomingField">Incoming Field</option>
                  </select>
              </div>
              <div class="column column-10" v-if="this.authorizationUsername.valueType === 'textInput'">
                <input
                  type="text"
                  placeholder="Text Input Value"
                  class="column-input-text border-hidden column-input-select-stretch"
                  :value="this.authorizationUsername.value"
                  v-on:input="editValue('value', this.authorizationUsername._id, $event)"
                />
              </div>
              <div class="column column-data column-10" v-if="this.authorizationUsername.valueType === 'storage'">
                <select class="column-input-select border-hidden column-input-select-stretch">
                    <option
                        v-for="(storage) in storagesForSelect()"
                        :key="storage._id"
                        :value="storage._id"
                      >{{ storage.name }}</option>
                  </select>
              </div>
              <div class="column column-data column-10" v-if="this.authorizationUsername.valueType === 'runtimeResult'">
                <input
                  type="text"
                  placeholder="Request result name"
                  class="column-input-text border-hidden column-input-select-stretch"
                  :value="this.authorizationUsername.value"
                  v-on:input="editValue('value', this.authorizationUsername._id, $event)"
                />
              </div>
              <div class="column column-data column-10" v-if="this.authorizationUsername.valueType === 'incomingField'">
                <input
                  type="text"
                  placeholder="Field Name"
                  class="column-input-text border-hidden column-input-select-stretch"
                  :value="this.authorizationUsername.value"
                  v-on:input="editValue('value', this.authorizationUsername._id, $event)"
                />
              </div>
              <div class="column text-button action">
                Show
              </div>
            </div>



            <div class="row row-border-bottom" v-if="this.authorizationType === 'basicAuth'">
              <div class="column column-data column-10">
                <input
                  disabled
                  type="text"
                  value="Password"
                  class="column-input-select border-hidden column-input-select-stretch"
                />
              </div>
              <div class="column column-data column-10">
                <select class="column-input-select border-hidden column-input-select-stretch"
                :value="this.authorizationPassword.valueType"
                v-on:input="editAuthorizationValueTypeAction('valueType', this.authorizationPassword._id, $event)">
                    <option value="textInput">Text Input</option>
                    <option value="storage">Storage</option>
                    <option value="runtimeResult">Runtime Result</option>
                    <option value="incomingField">Incoming Field</option>
                  </select>
              </div>
              <div class="column column-10" v-if="this.authorizationPassword.valueType === 'textInput'">
                <input
                  type="text"
                  placeholder="Text Input Value"
                  class="column-input-text border-hidden column-input-select-stretch"
                  :value="this.authorizationPassword.value"
                  v-on:input="editValue('value', this.authorizationPassword._id, $event)"
                />
              </div>
              <div class="column column-data column-10" v-if="this.authorizationPassword.valueType === 'storage'">
                <select class="column-input-select border-hidden column-input-select-stretch">
                    <option
                        v-for="(storage) in storagesForSelect()"
                        :key="storage._id"
                        :value="storage._id"
                      >{{ storage.name }}</option>
                  </select>
              </div>
              <div class="column column-data column-10" v-if="this.authorizationPassword.valueType === 'runtimeResult'">
                <input
                  type="text"
                  placeholder="Request result name"
                  class="column-input-text border-hidden column-input-select-stretch"
                  :value="this.authorizationPassword.value"
                  v-on:input="editValue('value', this.authorizationPassword._id, $event)"
                />
              </div>
              <div class="column column-data column-10" v-if="this.authorizationPassword.valueType === 'incomingField'">
                <input
                  type="text"
                  placeholder="Field Name"
                  class="column-input-text border-hidden column-input-select-stretch"
                  :value="this.authorizationPassword.value"
                  v-on:input="editValue('value', this.authorizationPassword._id, $event)"
                />
              </div>
              <div class="column text-button action">
                Show
              </div>
            </div>


        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "RequestOptionsAuthorization",
  data: function() {
    return {
      valueType: 'incomingField',
    }
  },
  computed: {
    ...mapGetters("table", ['selectedData']),
    ...mapGetters("table", ['selectedData','storagesForSelect']),

    authorizationType: function() {
      if (!this.selectedData()._id) return {}

      return this.selectedData().authorizationType      
    },
    authorizationUsername: function() {
      if (!this.selectedData()._id) return {}

      return this.selectedData().authorization[0]      
    },
    authorizationPassword: function() {
      if (!this.selectedData()._id) return {}

      return this.selectedData().authorization[1]      
    },
  },
  methods: {
    ...mapMutations('table', ['editRequestKey', 'editRequestAuthorization']),
    edit: function(key, event) {
      this.editRequestKey({key, value: event.target.value, requestId: this.selectedData()._id})
    },
    editAuthorizationTypeAction: function(event) {
      const value = event.target.value
      this.editRequestKey({ key: 'authorizationType', value, requestId: this.selectedData()._id })
    },
    editAuthorizationValueTypeAction: function(taskType, taskId, event) {
      this.editRequestAuthorization({ key: taskType, _id: taskId, value: event.target.value, requestId: this.selectedData()._id})
    },
  },
  filters: {
    capitalize: function (key) {
      if (!key) return ''
      return key.charAt(0).toUpperCase() + key.slice(1)
    }
  }
};
</script>