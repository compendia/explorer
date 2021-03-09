<template>
  <div v-if="wallet" class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("WALLET.SUMMARY") }}</ContentHeader>

    <WalletDetails :wallet="wallet" />

    <section v-show="isDelegate || wallet.vote" :class="{ 'py-5 md:py-10': isDelegate }" class="mb-5 page-section">
      <div class="px-5 sm:px-10">
        <WalletDelegate v-if="isDelegate" :wallet="wallet" />
        <WalletVote v-if="wallet.vote && !isDelegate" :wallet="wallet" />
      </div>
    </section>

    <section v-if="isDelegate && wallet.files.description && !isBlacklisted" class="mb-5 page-section">
      <div class="px-5 sm:px-10">
        <WalletDelegateDescription :wallet="wallet" />
      </div>
    </section>

    <div v-show="isDelegate && !isBlacklisted && wallet.files.description" class="text-center text-sm italic mt-1 mb-5 px-5 sm:px-10">
      {{ $t("STAKE.DELEGATE_DISCLAIMER", { delegate: wallet.username }) }}
    </div>

    <div v-show="isBlacklisted" class="text-center text-sm italic mt-1 mb-5 px-5 sm:px-10">
      <div style="margin-top:7px; opacity: 0.5;">
        <small>
          This validator's profile has been filtered from Compendia's official services as it didn't follow <a href="https://compendia.org/use-common-sense" target="_blank">Common Sense Guidelines</a>. The content may still be available on <a href="https://github.com/Bx64/Awesome-Compendia" target="_blank">third-party services</a>.
        </small>
      </div>
    </div>

    <section v-show="isStaking" class="py-5 page-section md:py-10 mb-5">
      <WalletStaking :wallet="wallet" />
    </section>

    <WalletTransactions v-if="wallet" :wallet="wallet" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
import { IWallet } from "@/interfaces";
import {
  WalletDelegate,
  WalletDelegateDescription,
  WalletDetails,
  WalletStaking,
  WalletTransactions,
  WalletVote,
} from "@/components/wallet";
import WalletService from "@/services/wallet";
const blacklist = require("@/components/wallet/blacklist.json");

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  components: {
    WalletDelegate,
    WalletDelegateDescription,
    WalletDetails,
    WalletStaking,
    WalletTransactions,
    WalletVote,
  },
})
export default class WalletPage extends Vue {
  private wallet: IWallet | null = null;
  private activeTab = "all";

  get isBlacklisted() {
    if (this.wallet && this.wallet.address && blacklist.wallets.includes(this.wallet.address)) {
      return true;
    }
  }

  get isDelegate() {
    if (this.wallet) {
      return this.wallet.isDelegate;
    }
  }

  get isStaking() {
    if (this.wallet) {
      return Object.keys(this.wallet.stakes).length > 0;
    }
  }

  public async beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
    try {
      const response = await WalletService.find(to.params.address);
      next((vm: WalletPage) => vm.setWallet(response));
    } catch (e) {
      next({ name: "404" });
    }
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: (vm?: any) => void) {
    this.wallet = null;

    try {
      const response = await WalletService.find(to.params.address);
      this.setWallet(response);
      next();
    } catch (e) {
      next({ name: "404" });
    }
  }

  private setWallet(wallet: IWallet) {
    this.wallet = wallet;
  }
}
</script>
