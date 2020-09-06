<template>
  <Loader :data="wallets">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="wallets"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template slot-scope="data">
        <div v-if="data.column.field === 'originalIndex'">
          {{ getRank(data.row.originalIndex) }}
        </div>

        <div v-else-if="data.column.field === 'address'">
          <LinkWallet :key="data.row.address" :address="data.row.address" :trunc="truncateAddress" />
        </div>

        <div v-else-if="data.column.field === 'balance'">
          <span>
            {{ readableCrypto(data.row.balance, true, truncateBalance ? 2 : 8) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'stakes'">
          <span>
            {{ readableCrypto(getStaked(Object.values(data.row.stakes)), true, truncateBalance ? 2 : 8) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'stakePower'">
          <span>
            {{ readableCrypto(data.row.stakePower, true, truncateBalance ? 2 : 8) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'power'">
          <span>
            {{ readableCrypto(data.row.power, true, truncateBalance ? 2 : 8) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'supply'">
          {{ supplyPercentage(data.row.balance) }}
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ISortParameters, IWallet, IStake } from "@/interfaces";
import { mapGetters } from "vuex";
import { BigNumber } from "@/utils";
import { paginationLimit } from "@/constants";

@Component({
  computed: {
    ...mapGetters("network", ["supply"]),
  },
})
export default class TableWalletsDesktop extends Vue {
  get truncateBalance() {
    return true;
  }

  get truncateAddress() {
    return this.windowWidth < 850;
  }

  get columns() {
    const columns = [
      {
        label: this.$t("COMMON.RANK"),
        field: "originalIndex",
        type: "number",
        thClass: "start-cell w-32",
        tdClass: "start-cell w-32",
      },
      {
        label: this.$t("WALLET.ADDRESS"),
        field: "address",
      },
      {
        label: this.$t("COMMON.BALANCE"),
        field: "balance",
        type: "number",
        tdClass: "whitespace-no-wrap",
      },
      {
        label: this.$t("STAKE.STAKED"),
        field: "stakes",
        type: "number",
        thClass: "hidden xl:table-cell",
        tdClass: "hidden xl:table-cell whitespace-no-wrap",
      },
      {
        label: this.$t("STAKE.STAKE_POWER"),
        field: "stakePower",
        type: "number",
        thClass: "hidden lg:table-cell",
        tdClass: "hidden lg:table-cell whitespace-no-wrap",
      },
      {
        label: this.$t("STAKE.TOTAL_POWER"),
        field: "power",
        type: "number",
        tdClass: "whitespace-no-wrap",
      },
      {
        label: this.$t("COMMON.SUPPLY"),
        field: "supply",
        type: "number",
        sortable: false,
        thClass: "end-cell w-24 not-sortable",
        tdClass: "end-cell w-24",
      },
    ];

    return columns;
  }
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public wallets: IWallet[] | null;
  @Prop({ required: true }) public total: string;

  private windowWidth = 0;
  private supply: string;

  public mounted() {
    this.windowWidth = window.innerWidth;

    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });
    });
  }

  public supplyPercentage(balance: string): string {
    // @ts-ignore
    return this.percentageString(BigNumber.make(balance).dividedBy(this.total).times(100).toNumber());
  }

  private getRank(index: number) {
    const page = Number(this.$route.params.page) > 1 ? Number(this.$route.params.page) - 1 : 0;

    return page * paginationLimit + (index + 1);
  }

  private emitSortChange(params: ISortParameters[]) {
    this.$emit("on-sort-change", params[0]);
  }

  private getStaked(stakes: IStake[]) {
    let staked = BigNumber.ZERO;
    for (const stake of stakes) {
      if (stake.status !== 'released') {
        staked = staked.plus(BigNumber.make(stake.amount));
      }
    }
    return staked.toString();
  }
}
</script>
