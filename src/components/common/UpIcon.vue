<script>
import { inject, h, computed } from "vue";
import { NIcon, NButton } from "naive-ui";
export default {
  name: "UpIcon",
  setup(props) {
    const appThemeColor = inject("appThemeColor");
    const color = computed(() =>
      props.color ? props.color : appThemeColor
    );
    if (props.onClick) {
      return () =>
        h(
          NButton,
          {
            text: true,
            onClick: props.onClick,
          },
          h(
            NIcon,
            {
              size: props.size,
              // 设置颜色
              color: color.value,
              // 设置颜色深度
              depth: props.depth,
            },
            () => h(iconDict[props.icon])
          )
        );
    }
    return () =>
      h(
        NIcon,
        {
          size: props.size,
          // 设置颜色
          color: color.value,
          // 设置颜色深度
          depth: props.depth,
        },
        () => h(iconDict[props.icon])
      );
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 24,
    },
    color: {
      type: String,
      default: null,
    },
    depth: {
      type: Number,
      default: 1,
    },
    onClick: {
      type: Function,
      default: null,
    },
  },
};

// 字典封装
import {
  BarChartOutline,
  BrushOutline,
  CopyOutline,
  PowerOutline,
  AlbumsOutline,
  Ellipse,
  BuildOutline,
  CubeOutline,
  AnalyticsOutline,
  InformationCircleOutline,
  FitnessOutline,
  FlashOutline,
  HelpBuoyOutline,
  LinkOutline,
  BarcodeOutline
} from "@vicons/ionicons5";
const iconDict = {
  BarChartOutline,
  BrushOutline,
  CopyOutline,
  PowerOutline,
  AlbumsOutline,
  Ellipse,
  BuildOutline,
  CubeOutline,
  AnalyticsOutline,
  InformationCircleOutline,
  FitnessOutline,
  FlashOutline,
  HelpBuoyOutline,
  LinkOutline,
  BarcodeOutline
};
</script>

<style></style>
