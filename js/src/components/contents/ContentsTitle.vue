<template>
  <div class="contents-title">
    <span class="contents-title">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ContentsTitle extends Vue {
  @Prop() private title!: string;
}
</script>

<style scoped>
div.contents-title {
  padding: 2em;
}

span.contents-title {
  font-weight: bold;
}
</style>
