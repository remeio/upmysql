import { createRouter, createWebHistory, RouterLink } from "vue-router";
import { h } from "vue";
import { UpIcon } from "@/components/common";
import { routerConfig } from "@/router/config"
/**
 * 渲染 icon
 * @param {String} icon icon name
 */
function renderIcon(icon) {
  return () => h(UpIcon, { icon: icon }, null);
}

/**
 * 渲染 router link
 * @param {String} name
 * @param {String} label
 */
function renderRouterLink(name, label) {
  return () =>
    h(
      RouterLink,
      {
        to: {
          name: name,
        },
      },
      { default: () => label }
    );
}


// 动态路由
let routerNameDict = new Array();
let routerObjArray = [];
for (let i = 0; i < routerConfig.length; i++) {
  let firstUrl = routerConfig[i];
  firstUrl.icon = renderIcon(firstUrl.icon);
  for (let j = 0; j < firstUrl.children.length; j++) {
    let secondUrl = firstUrl.children[j];
    if (secondUrl.type === "group") {
      for (let k = 0; k < secondUrl.children.length; k++) {
        let thirdUrl = secondUrl.children[k];
        let routeObj = {};
        routeObj.path =
          "/" + firstUrl.key + "/" + secondUrl.key + "/" + thirdUrl.key;
        routeObj.name = routeObj.path;
        routeObj.component = thirdUrl.component;
        routerObjArray.push(routeObj);
        routerNameDict[routeObj.path] = [
          firstUrl.label,
          secondUrl.label,
          thirdUrl.label,
        ];
        thirdUrl.icon = renderIcon(thirdUrl.icon);
        thirdUrl.label = renderRouterLink(routeObj.path, thirdUrl.label);
      }
      continue;
    }
    let routeObj = {};
    routeObj.path = "/" + firstUrl.key + "/" + secondUrl.key;
    routeObj.name = routeObj.path;
    routeObj.component = secondUrl.component;

    routerObjArray.push(routeObj);
    routerNameDict[routeObj.path] = [firstUrl.label, secondUrl.label];

    secondUrl.label = renderRouterLink(routeObj.path, secondUrl.label);
    secondUrl.icon = renderIcon(secondUrl.icon);
  }
}
const router = createRouter({
  history: createWebHistory(),
  routes: routerObjArray,
});
export { router, routerConfig, routerNameDict };
