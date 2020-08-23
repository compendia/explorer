<template>
  <section class="">
    <h2 class="px-5 md:px-10 mb-5 text-2xl text-theme-text-primary">
      {{ $t("COMMON.STAKES") }}
    </h2>
    <div class="hidden sm:block">
      <TableStakeTransactionsDesktop :stakes="wallet.stakes" />
    </div>
    <div class="sm:hidden">
      <TableStakeTransactionsMobile :stakes="wallet.stakes" />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IWallet } from "@/interfaces";
import WalletVoters from "@/components/wallet/Voters.vue";
import { QrModal } from "@/components/modals";

@Component({
  components: {
    WalletVoters,
    QrModal,
  },
  computed: {
    ...mapGetters("network", ["isListed", "knownWallets", "token"]),
    ...mapGetters("currency", { currencyName: "name" }),
  },
})
export default class WalletStaking extends Vue {
  @Prop({ required: true }) public wallet: IWallet;
}
</script>