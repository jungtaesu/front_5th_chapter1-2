// import { createVNode } from "./createVNode";

export function normalizeVNode(vNode) {
  console.log("normalizeVNode:", vNode);
  if (vNode == undefined || vNode == null || typeof vNode == "boolean") {
    console.log("여기는 다 빈값으로 가는거야");
    return "";
  }

  if (typeof vNode == "string" || typeof vNode == "number") {
    return vNode.toString();
  }

  console.log("vNode:", vNode);

  console.log("vNode.type", vNode.type);
  console.log("vNode.props:", vNode.props);
  console.log("vNode.children:", vNode.children);

  if (typeof vNode.type == "function") {
    console.log("여기는 함수형 컴포넌트로 가는거야");
    const props = vNode.props || {};
    console.log("vNode.type:", vNode.type);
    console.log("vNode.type(props):", vNode.type(props));
    //vNode.type 만 보면 그냥 [Function: UnorderedList] 이렇게만 나오는ㄷ ㅔ실행시키면 된다.
    const renderedVNode = vNode.type(props);
    console.log("renderedVNode:", renderedVNode);
    return normalizeVNode(renderedVNode); // 재귀적으로 정규화
  }

  // return createVNode(vNode.type, vNode.props, ...vNode.children)
}
