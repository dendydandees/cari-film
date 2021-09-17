<template>
  <article class="fixed top-0 left-0 h-screen w-screen">
    <div
      class="bg-black opacity-50 absolute top-0 left-0 w-screen h-screen"
    ></div>

    <button
      class="btn-primary p-2 absolute top-4 right-6 lg:right-8"
      @click="$emit('close')"
    >
      <client-only>
        <span
          class="iconify"
          data-icon="fe:close"
          data-width="24"
          data-height="24"
        ></span>
      </client-only>
    </button>

    <slot></slot>
  </article>
</template>

<script>
export default {}
</script>

<style></style>
