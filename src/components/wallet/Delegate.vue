<template>
  <div v-if="delegate" class="flex flex-col WalletDelegate md:flex-row">
    <div v-if="delegate.files.logo && !isBlacklisted" class="self-center w-full max-w-xs md:w-full md:mr-10">
      <div>
        <img v-if="logoData" loading="lazy" :src="logoData" class="object-contain rounded-lg m-auto" />
      </div>
    </div>
    <div class="flex flex-col w-full flex-3">
      <div class="list-row-border-b">
        <div>{{ $t("WALLET.DELEGATE.USERNAME") }}</div>
        <div>{{ delegate.username }}</div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("WALLET.DELEGATE.STATUS.TITLE") }}</div>
        <div :class="delegateStatus.class">{{ delegateStatus.text }}</div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("WALLET.DELEGATE.RANK") }}</div>
        <div>
          <span v-if="delegate.rank === undefined && delegate.isResigned">
            {{ $t("WALLET.DELEGATE.RANK_NOT_APPLICABLE") }}
          </span>
          <span v-else-if="delegate.rank === undefined">{{ $t("WALLET.DELEGATE.RANK_NOT_AVAILABLE") }}</span>
          <span v-else>{{ delegate.rank }}</span>
        </div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("WALLET.DELEGATE.VOTES") }}</div>
        <div v-if="delegate.production">
          <span
            v-tooltip="
              delegate.votes
                ? {
                    trigger: 'hover click',
                    content: $t('COMMON.SUPPLY_PERCENTAGE'),
                    placement: 'left',
                  }
                : {}
            "
            class="mr-1 text-xs text-grey"
            >{{ percentageString(delegate.production.approval) }}</span
          >
          {{ readableCrypto(delegate.votes, false, 2) }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("WALLET.DELEGATE.TOTAL_FORGED") }}</div>
        <div v-if="delegate.forged">{{ readableCrypto(delegate.forged.total) }}</div>
      </div>

      <div class="list-row">
        <div>{{ $t("WALLET.DELEGATE.FORGED_BLOCKS") }}</div>
        <div v-if="delegate.blocks">
          <span>{{ readableNumber(delegate.blocks.produced) }}</span>
          <RouterLink
            v-if="delegate.blocks.produced"
            :to="{ name: 'wallet-blocks', params: { address: delegate.address, username: delegate.username, page: 1 } }"
            class="ml-2"
            >{{ $t("COMMON.SEE_ALL") }}</RouterLink
          >
        </div>
      </div>

      <WalletVoters :wallet="wallet" />

      <WalletVote v-if="wallet.vote" :wallet="wallet" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IWallet } from "@/interfaces";
import WalletVoters from "@/components/wallet/Voters.vue";
import WalletVote from "@/components/wallet/Vote.vue";
import { IPFSService } from "@/services";
const blacklist = require("@/components/wallet/blacklist.json");

@Component({
  components: {
    WalletVoters,
    WalletVote,
  },
})
export default class WalletDelegate extends Vue {
  @Prop({ required: true }) public wallet: IWallet;

  private logoData: string | null = null;

  get isBlacklisted() {
    if (this.wallet && this.wallet.address && blacklist.wallets.includes(this.wallet.address)) {
      return true;
    }
  }

  get delegate() {
    return this.$store.getters["delegates/byPublicKey"](this.wallet.publicKey);
  }

  public mounted() {
    this.fetchLogo();
  }

  private async fetchLogo() {
    // @ts-ignore
    this.logoData = await IPFSService.fetchData(this.wallet.files.logo);
  }

  get delegateStatus() {
    const activeThreshold = this.$store.getters["network/activeDelegates"];
    if (this.wallet.isResigned) {
      return { text: this.$t("WALLET.DELEGATE.STATUS.RESIGNED"), class: "text-status-not-forging" };
    }
    if (this.delegate.rank && this.delegate.rank <= activeThreshold) {
      return { text: this.$t("WALLET.DELEGATE.STATUS.ACTIVE"), class: "text-status-forging" };
    }
    return { text: this.$t("WALLET.DELEGATE.STATUS.STANDBY"), class: "text-status-missed-round" };
  }
}
</script>
