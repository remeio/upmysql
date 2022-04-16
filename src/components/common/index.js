import UpIconHeader from "./UpIconHeader.vue";
import UpIcon from "./UpIcon.vue";
import UpTooltip from "./UpTooltip.vue";
import UpCard from "./UpCard.vue";
import UpTable from "./UpTable";
let components = [UpIconHeader, UpIcon, UpTooltip, UpCard, UpTable];
let install = function (vue) {
  components.forEach((r) => {
    vue.component(r.name, r);
    console.log(r.name)
  });
  console.log("up components installed.");
};
export default { install };
