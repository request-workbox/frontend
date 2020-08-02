<template>
  <div class="row" v-if="componentShouldBeDisplayed()">
    <div class="column column-full-width">
      <div class="row row-border-bottom column-group-header">
        <div class="column column-data column-header-text column-uparrow-header">
          <span>▲</span>
        </div>
        <div class="column column-data column-header-text column-20" id="options-header-1">Adapter</div>
        <div class="column column-data column-header-text column-20" id="options-header-2">Timeout</div>
        <div
          class="column column-data column-header-text column-20"
          id="options-header-2"
        >On Failure</div>
        <div
          class="column column-data column-header-text column-grow"
          id="options-header-2"
        >Environment</div>
      </div>

      <div class="row row-border-bottom column-group-header">
        <div class="column column-data column-header-text column-uparrow-header">
          <span>▲</span>
        </div>
        <div
          class="column column-data column-header-text column-grow"
        >Request Adapters</div>
      </div>

      <div
        class="row row-border-bottom"
        v-for="value in this.selectedData().requestAdapters"
        :key="value._id"
      >
        <div
              class="column column-data column-uparrow"
              v-on:click="changeAdapterPositionAction('requestAdapters', value._id)"
            >
              <span>▲</span>
            </div>
        <div class="column column-data column-20">
          <select
            class="column-input-select column-input-select-grow"
            :value="value.adapterId"
            v-on:input="edit('requestAdapters', value._id, 'adapterId', $event)"
          >
            <option
              v-for="(adapter) in adapters()"
              :key="adapter._id"
              :value="adapter._id"
            >{{adapter.url.name}}</option>
          </select>
        </div>
        <div class="column column-data column-20">
          <select
            class="column-input-select column-input-select-grow"
            :value="value.timeout"
            v-on:input="edit('requestAdapters', value._id, 'timeout', $event)"
          >
            <option value="30seconds">30 Seconds</option>
            <option value="60seconds">60 Seconds</option>
          </select>
        </div>
        <div class="column column-data column-20">
          <select
            class="column-input-select column-input-select-grow"
            :value="value.onFailure"
            v-on:input="edit('requestAdapters', value._id, 'onFailure', $event)"
          >
            <option value="stop">Stop</option>
            <option value="send200continue">Send 200 and Continue</option>
            <option value="send500continue">Send 500 and Continue</option>
          </select>
        </div>
        <div class="column column-data column-grow">
          <select
            class="column-input-select column-input-select-grow"
            :value="value.environment"
            v-on:input="edit('requestAdapters', value._id, 'environment', $event)"
          >
            <option
              v-for="(environment) in environments()"
              :key="environment._id"
              :value="environment._id"
            >{{ environment.name }}</option>
          </select>
        </div>
        <div
          class="column column-data text-button"
          v-on:click="deleteAdapterAction('requestAdapters', value._id )"
        >Remove</div>
      </div>

      <div class="row row-border-bottom column-group-header">
        <div class="column column-data column-header-text column-uparrow-header">
          <span>▲</span>
        </div>
        <div
          class="column column-data column-header-text column-grow"
        >Response Adapters</div>
      </div>

      <div
        class="row row-border-bottom"
        v-for="value in this.selectedData().responseAdapters"
        :key="value._id"
      >
        <div
              class="column column-data column-uparrow"
              v-on:click="changeAdapterPositionAction('responseAdapters', value._id)"
            >
              <span>▲</span>
            </div>
        <div class="column column-data column-20">
          <select
            class="column-input-select column-input-select-grow"
            :value="value.adapterId"
            v-on:input="edit('responseAdapters', value._id, 'adapterId', $event)"
          >
            <option
              v-for="(adapter) in adapters()"
              :key="adapter._id"
              :value="adapter._id"
            >{{adapter.url.name}}</option>
          </select>
        </div>
        <div class="column column-data column-20">
          <select
            class="column-input-select column-input-select-grow"
            :value="value.timeout"
            v-on:input="edit('responseAdapters', value._id, 'timeout', $event)"
          >
            <option value="30seconds">30 Seconds</option>
            <option value="60seconds">60 Seconds</option>
          </select>
        </div>
        <div class="column column-data column-20">
          <select
            class="column-input-select column-input-select-grow"
            :value="value.onFailure"
            v-on:input="edit('responseAdapters', value._id, 'onFailure', $event)"
          >
            <option value="stop">Stop</option>
            <option value="send200continue">Send 200 and Continue</option>
            <option value="send500continue">Send 500 and Continue</option>
          </select>
        </div>
        <div class="column column-data column-grow">
          <select
            class="column-input-select column-input-select-grow"
            :value="value.environment"
            v-on:input="edit('responseAdapters', value._id, 'environment', $event)"
          >
            <option
              v-for="(environment) in environments()"
              :key="environment._id"
              :value="environment._id"
            >{{ environment.name }}</option>
          </select>
        </div>
        <div
          class="column column-data text-button"
          v-on:click="deleteAdapterAction('responseAdapters', value._id )"
        >Remove</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "RequestOptionsAdapters",
  computed: {
    ...mapGetters("table", ["adapters", "selectedData", "environments"]),
  },
  methods: {
    ...mapActions("table", ["deleteRequestAdapter"]),
    ...mapMutations("table", ["editRequestAdapter",'changeAdapterPosition']),
    edit: function (type, _id, key, event) {
      this.editRequestAdapter({
        type,
        _id,
        key,
        value: event.target.value,
        requestId: this.selectedData()._id,
      });
    },
    componentShouldBeDisplayed: function () {
      if (!this.selectedData() || !this.selectedData().requestSettings)
        return true;

      if (this.selectedData().requestSettings.requestType === "adapter") {
        return false;
      } else {
        return true;
      }
    },
    deleteAdapterAction: function (type, adapterId) {
      this.deleteRequestAdapter({
        type: type,
        adapterId: adapterId,
        requestId: this.selectedData()._id,
      });
    },
    changeAdapterPositionAction: function (type, adapterId) {
      this.changeAdapterPosition({ type, requestId: this.selectedData()._id, adapterId });
    },
  },
};
</script>