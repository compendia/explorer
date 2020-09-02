<template>
  <div>
    <Loader :data="stakeValues">
      <div v-for="stakeValue in stakeValues" :key="stakeValue.timestamps.created" class="row-mobile">

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("STAKE.STATUS") }}
          </div>
          <div>
            {{ stakeValue.status }}
          </div>
        </div>

        <div class="list-row-border-b-no-wrap">
          <div class="mr-4">
            {{ $t("STAKE.DURATION") }}
          </div>
          <div class="text-right">
            {{ determineStakeTime(stakeValue.duration) }}
          </div>
        </div>

        <div class="list-row-border-b-no-wrap">
          <div class="mr-4">
            {{ $t("STAKE.TIME_REMAINING") }}
          </div>
          <div class="text-right">
            {{ readableTimestampAgo(stakeValue.timestamps.redeemable) }}
          </div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("TRANSACTION.AMOUNT") }}
          </div>
          <div>
            <TransactionAmount :transaction="stakeValue" />
          </div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("STAKE.POWER") }}
          </div>
          <div>
            <TransactionAmount :transaction="stakeValue" :stake-power="stakeValue.power" />
          </div>
        </div>

        <div class="list-row-border-b-no-wrap">
          <div class="mr-4">
            {{ $t("STAKE.RELEASE") }}
          </div>
          <div class="text-right">
            {{ readableTimestamp(stakeValue.timestamps.redeemable) }}
          </div>
        </div>
      </div>
      <div v-if="stakeValues && !stakeValues.length" class="px-5 md:px-10">
        <span>{{ $t("COMMON.NO_RESULTS") }}</span>
      </div>
    </Loader>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ITransaction, IDelegate, IStakeWrapper } from "@/interfaces";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("network", ["activeDelegates"]),
    ...mapGetters("ui", ["smartbridgeFilter"]),
  },
})
export default class StakeTransactionsMobile extends Vue {
  @Prop({ required: true }) public stakes: IStakeWrapper | null;

  get stakeValues() {
    if (this.stakes) {
      return Object.values(this.stakes);
    }
  }

  private determineStakeTime(seconds: number) {
    return {
      '31557600': 'a year',
      '15778800': '6 months',
      '7889400': '3 months',
      '86400': 'a day',
    }[seconds];
  }
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
