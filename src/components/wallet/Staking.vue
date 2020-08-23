<template>
  <section class="">
    <h2 class="px-5 md:px-10 mb-5 text-2xl text-theme-text-primary">
      {{ $t("COMMON.STAKES") }}
    </h2>
    <TableStakeTransactionsDesktop :stakes="wallet.stakes" />
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