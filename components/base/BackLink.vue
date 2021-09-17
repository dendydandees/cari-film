<template>
  <NuxtLink :to="link" class="flex items-center">
    <client-only>
      <span
        class="iconify flex-none"
        data-icon="bi:arrow-left-short"
        data-width="24"
        data-height="24"
      ></span>
    </client-only>
    <span class="flex-none">Kembali</span>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: '/',
    },
  },
}
</script>

<style></style>
