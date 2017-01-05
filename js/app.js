let same  = "Price is same as on sign.",
    sames = "Prices are same as on sign.",
    diff  = "Price is different than on sign.",
    diffs = "Prices are different than on sign.";

new Vue({
    el: 'main',

    data: {
        detail: false,
        detailText: "Show Price Tiers",
        signPrice: sames,
        isActive: null,

        commodities: [
            {
                id: 0,
                name: 'Unleaded',
                price: 1.85,
                priceTitle: same,
                tierDiffs: [ 0, 0, 0.05, 0.08, -0.03 ]
            },
            {
                id: 1,
                name: 'Midgrade',
                price: 1.94,
                priceTitle: same,
                tierDiffs: [ 0, 0, 0.05, 0.08, -0.03 ]
            },
            {
                id: 2,
                name: 'Premium',
                price: 2.06,
                priceTitle: same,
                tierDiffs: [ 0, 0, 0.05, 0.08, -0.03 ]
            },
            {
                id: 3,
                name: 'Flexfuel',
                price: 1.55,
                priceTitle: same,
                tierDiffs: [ 0, 0, 0.05, 0.08, -0.03 ]
            },
            {
                id: 4,
                name: 'Diesel',
                price: 2.75,
                priceTitle: same,
                tierDiffs: [ 0, 0, 0.05, 0.08, -0.03 ]
            }],
        tiers: [
            {
                id: 0,
                name: "Base Price",
            },
            {
                id: 1,
                name: "Cash Price",
            },
            {
                id: 2,
                name: "Debit Price",
            },
            {
                id: 3,
                name: "Credit Price",
            },
            {
                id: 4,
                name: "Loyalty Price",
            }
        ]
    },

    computed: {
        signPriceState: function () {
            return this.signPrice;
        },
        signState: function () {
            return this.signPrice == diffs;
        },
        activeCommodity: function () {
            return this.isActive
        }
    },

    mounted () {
        this.commodities.forEach(function(commodity) {
            commodity.resetTierDiffs = [];
            commodity.tierDiffsChanged = [];
            commodity.reset = commodity.price;
            commodity.priceChanged = false;
            commodity.tierDiffs.forEach(function (value) {
                commodity.resetTierDiffs.push(value);
                commodity.tierDiffsChanged.push(false);
            });
        });
    },

    methods: {
        toggleDetail: function () {
            this.detail = ! this.detail;
            this.detailText = this.detail ? "Hide Price Tiers" : "Show Price Tiers";
        },
        resetPrices: function () {
            this.commodities.forEach(function (commodity){
                commodity.price = commodity.reset;
                commodity.tierDiffs = commodity.resetTierDiffs;
                commodity.priceChanged = false;
                commodity.priceTitle = same;
                commodity.tierDiffsChanged = [];
                commodity.tierDiffs.forEach(function (){
                    commodity.tierDiffsChanged.push(false);
                })
            });
            this.signPrice = sames;
        },
        priceChange: function (commodity) {
            commodity.priceChanged = commodity.price != commodity.reset;
            commodity.priceTitle = commodity.priceChanged ? diff : same;
            this.priceState();
        },
        diffChange: function (commodity, tier) {
            commodity.tierDiffsChanged[tier] = commodity.tierDiffs[tier] != commodity.resetTierDiffs[tier];
            commodity.priceTitle = commodity.tierDiffsChanged[tier] ? diff : same;
            this.priceState();
        },
        setActive: function (index){
            this.isActive = index;
            $('#commodities-modal').foundation('open');
        },
        priceState: function () {
            let state = sames;
            this.commodities.forEach(function (commodity) {
                if(commodity.priceChanged) state = diffs;
                commodity.tierDiffsChanged.forEach(function (tier) {
                    if(tier) state = diffs;
                })
            });
            this.signPrice = state;
        },
        updatePrices: function () {
            this.commodities.forEach(function (commodity) {
                commodity.reset = commodity.price;
                commodity.resetTierDiffs = commodity.tierDiffs;
                commodity.priceChanged = false;
                commodity.priceTitle = same;
                commodity.tierDiffsChanged = [];
                commodity.tierDiffs.forEach(function (){
                    commodity.tierDiffsChanged.push(false);
                })
            });
            this.signPrice = sames;
            $('#sendPrices').foundation('open');
        }
    }
});
