<template>
  <div
    class="
      w-full
      md:w-8/12
      lg:w-6/12
      bg-white
      shadow-lg
      rounded-md
      px-4
      py-6
      text-center
      mx-auto
      space-y-8
    "
  >
    <span class="text-2xl font-bold block">
      {{ title }}
    </span>
    <span class="w-full md:w-10/12 lg:w-8/12 block mx-auto">
      {{ description }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Sedang mengalami gangguan 🙏',
    },
    description: {
      type: String,
      default:
        'Silahkan mencoba beberapa saat lagi dengan melakukan refresh pada halaman!',
    },
  },
}
</script>

<style></style>
