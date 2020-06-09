<template>
  <div id="sidebardetail-container">
    <p class="heading">Application</p>
    <p class="subtext">Subtext</p>
  </div>
</template>

<style lang="scss" scoped>
#sidebardetail-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 12px 0;
}

.heading {
  font-size: 1.25rem !important;
  font-weight: 500;
  letter-spacing: 0.0125em !important;
  line-height: 2rem;
  text-overflow: ellipsis;
  color: #fafafa;

  margin: 0;
  padding: 0 16px;
}
.subtext {
  color: #efefef;

  padding: 0 16px;
  margin: 0;

  line-height: 1.2;
  font-size: 0.875rem;
}
</style>