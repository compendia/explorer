<template>
  <div v-if="delegate" class="WalletDelegate py-10">
    <h2 class="mb-5 text-xl md:text-2xl md:mb-6 text-theme-text-primary">Description</h2>
    <div class="DelegateDescription" style="max-height: 400px;" v-html="description"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IWallet } from "@/interfaces";
import WalletVoters from "@/components/wallet/Voters.vue";
import { IPFSService } from "@/services";
import { allowedHtmlTags } from "@/constants";
import sanitizeHtml from "sanitize-html";

@Component({
  components: {
    WalletVoters,
  },
})
export default class WalletDelegateDescription extends Vue {
  @Prop({ required: true }) public wallet: IWallet;

  private description = null;

  get delegate() {
    return this.$store.getters["delegates/byPublicKey"](this.wallet.publicKey);
  }

  public mounted() {
    this.fetchDescription();
  }

  private async fetchDescription() {
    // @ts-ignore
    this.description = sanitizeHtml(await IPFSService.fetchData(this.wallet.files.description), allowedHtmlTags);
  }
}
</script>

<style>
.DelegateDescription {
  @apply .overflow-y-auto;
  line-height: 1.625;
}

.DelegateDescription h3 {
  @apply .font-bold .text-2xl;
}

.DelegateDescription h4 {
  @apply .font-bold .text-xl;
}

.DelegateDescription h5 {
  @apply .font-bold .text-lg;
}

.DelegateDescription h6 {
  @apply .font-bold;
}

.DelegateDescription p {
  @apply .mb-3;
}

.DelegateDescription ul {
  list-style-type: disc;
  list-style-position: inside;
}

.DelegateDescription ol {
  list-style-type: decimal;
  list-style-position: inside;
}

.DelegateDescription ul ul,
ol ul {
  list-style-type: circle;
  list-style-position: inside;
  margin-left: 15px;
}

.DelegateDescription ol ol,
ul ol {
  list-style-type: lower-latin;
  list-style-position: inside;
  margin-left: 15px;
}
</style>
