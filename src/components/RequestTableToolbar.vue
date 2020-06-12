<template>
    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column input-text-hover">
            <input class="input-text" type="text" placeholder="Search" id="table-toolbar-search-input" />
          </div>
        </div>
      </div>
      <div class="column spacer"></div>
      <div class="column">
        <div class="row">
          <div class="column text-button" id="table-toolbar-prev">Prev</div>
          <div class="column tiny-spacer"></div>
          <div class="column text" id="table-toolbar-pagination">{{ pagination }}</div>
          <div class="column tiny-spacer"></div>
          <div class="column text-button" id="table-toolbar-next">Next</div>
        </div>
      </div>
      <div class="column spacer"></div>
      <div class="column">
        <div class="row">
          <div class="column filter-button filter-button-left filter-button-active" id="table-toolbar-filter-active">Active</div>
          <div class="column filter-button" id="table-toolbar-filter-deleted">Deleted</div>
          <div class="column filter-button filter-button-right" id="table-toolbar-filter-all">All</div>
        </div>
      </div>
      <div class="column spacer"></div>
      <div class="column text-button" id="table-toolbar-refresh">Refresh</div>
    </div>
</template>

<script>
export default {
  name: 'RequestTableToolbar',
  props: ['page','totalPages'],
  computed: {
    pagination: function() {
      return `${this.page || 1} / ${this.totalPages || 40}`
    }
  }
}
</script>