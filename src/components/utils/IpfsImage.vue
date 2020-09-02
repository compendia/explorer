<template>
  <img class="object-contain flex-shrink-0" :class="customClass" loading="lazy" :src="imageData" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ISortParameters, IWallet } from "@/interfaces";
import { IPFSService } from '@/services';

@Component
export default class IpfsImage extends Vue {
  @Prop({ required: true }) public hash: string;
  @Prop({ required: false }) public customClass: string;

  private imageData: string = null;

  public async mounted() {
      this.imageData = await IPFSService.fetchData(this.hash);
  }
}
</script>
