<script>
import { inject, h } from "vue";
import { NH1, NH2, NH3, NH4, NH5, NH6 } from "naive-ui";
import UpIcon from "./UpIcon.vue";

export default {
  setup(props) {
    const appThemeColor = inject("appThemeColor");
    // 组件字典
    const headerDict = { 1: NH1, 2: NH2, 3: NH3, 4: NH4, 5: NH5, 6: NH6 };
    // 图标尺寸字典
    const iconSizeDict = { 1: 24, 2: 20, 3: 16, 4: 12, 5: 12, 6: 12 };
    if (!props.icon) {
      return () => h(headerDict[props.level], null, () => props.value);
    }
    return () =>
      h(headerDict[props.level], null, [
        h(
          UpIcon,
          {
            icon: props.icon,
            size: iconSizeDict[props.level],
            color: appThemeColor,
          },
          () => h(props.icon)
        ),
        " " + props.value,
      ]);
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style></style>
