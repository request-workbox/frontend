<template>
    <div class="row">
      <div class="column column-full-width">
        <div class="row row-border-bottom">
          <div class="column column-data column-header column-10" id="table-header-1">
            Heading 1
          </div>
          <div class="column column-data column-header column-10" id="table-header-2">
            Heading 2
          </div>
          <div class="column column-data column-header column-10" id="table-header-3">
            Heading 3
          </div>
          <div class="column column-data column-header column-grow" id="table-header-4">
            Heading 4
          </div>
        </div>

        <div class="row row-border-bottom">
          <div class="column column-data column-10" id="table-data-1">
            Value 1
          </div>
          <div class="column column-data column-10" id="table-data-2">
            Value 2
          </div>
          <div class="column column-data column-10" id="table-data-3">
            Value 3
          </div>
          <div class="column column-data column-grow" id="table-data-4">
            Value 4
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'RequestTable',
}
</script>