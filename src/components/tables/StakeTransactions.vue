<template>
  <Loader :data="stakeValues">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="stakeValues"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template slot-scope="data">
        <div v-if="data.column.field === 'amount'">
          <TransactionAmount :transaction="data.row" />
        </div>

        <div v-else-if="data.column.field === 'duration'">
          <span>
            {{ determineStakeTime(data.row.duration) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'timestamps.graceEnd'">
          <span>
            {{ readableTimestampAgo(data.row.timestamps.redeemable) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'power'">
          <TransactionAmount :transaction="data.row" :stake-power="data.row.power" />
        </div>

        <div v-else-if="data.column.field === 'status'">
          {{ data.row.status }}
        </div>

        <div v-else-if="data.column.field === 'timestamps.redeemable'">
          <span>
            {{ readableTimestamp(data.row.timestamps.redeemable) }}
          </span>
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IDelegate, ISortParameters, ITransaction, IStakeWrapper } from "@/interfaces";
import CryptoCompareService from "@/services/crypto-compare";

@Component({
  computed: {
    ...mapGetters("network", ["activeDelegates", "isListed"]),
    ...mapGetters("currency", { currencySymbol: "symbol" }),
    ...mapGetters("ui", ["smartbridgeFilter"]),
  },
})
export default class LockTransactionsDesktop extends Vue {
  @Prop({ required: true }) public stakes: IStakeWrapper | null;

  private activeDelegates: IDelegate[];
  private isListed: boolean;
  private currencySymbol: string;
  private smartbridgeFilter: string;

  get stakeValues() {
    if (this.stakes) {
      return Object.values(this.stakes);
    }
  }

  get columns() {
    const columns = [
      {
        label: this.$t("STAKE.STATUS"),
        field: "status",
        thClass: "start-cell",
        tdClass: "start-cell",
      },
      {
        label: this.$t("STAKE.DURATION"),
        field: "duration",
        thClass: "text-left hidden md:table-cell",
        tdClass: "text-left hidden md:table-cell wrap-timestamp",
      },
      {
        label: this.$t("STAKE.TIME_REMAINING"),
        field: "timestamps.graceEnd",
        tdClass: "break-all",
      },
      {
        label: this.$t("TRANSACTION.AMOUNT"),
        field: "amount",
        type: "number",
        thClass: "text-right",
      },
      {
        label: this.$t("STAKE.POWER"),
        field: "power",
        type: "number",
      },
      {
        label: this.$t("STAKE.RELEASE"),
        field: "timestamps.redeemable",
        thClass: "end-cell",
        tdClass: "end-cell wrap-timestamp",
      },
    ];

    return columns;
  }

  @Watch("currencySymbol")
  public async onCurrencySymbolChanged() {
    await this.updatePrices();
  }

  public async created() {
    this.prepareTransactions();
  }

  private async prepareTransactions() {
    await this.updatePrices();
  }

  private async fetchPrice(transaction: ITransaction) {
    transaction.price = await CryptoCompareService.dailyAverage(transaction.timestamp.unix);
  }

  private async updatePrices() {
    // if (!this.transactions) {
    //   return;
    // }
    // if (this.isListed) {
    //   const promises = this.transactions.map(this.fetchPrice);
    //   await Promise.all(promises);
    // }
  }

  private emitSortChange(params: ISortParameters[]) {
    this.$emit("on-sort-change", params[0]);
  }

  private determineStakeTime(seconds: number) {
    return {
      "31557600": "a year",
      "15778800": "6 months",
      "7889400": "3 months",
      "86400": "a day",
    }[seconds];
  }
}
</script>

<style scoped>
.icon {
  width: 16px;
  height: 16px;
}

.wrap-timestamp {
  white-space: normal;
}

@media (min-width: 870px) {
  .wrap-timestamp {
    white-space: nowrap;
  }
}
</style>
