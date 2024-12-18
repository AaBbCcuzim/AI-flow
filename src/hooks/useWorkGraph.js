import { ref } from "vue";
import { MarkerType } from "@vue-flow/core";

export function useWorkGraph() {
  const nodes = [];
  const edges = [];
  const nodes_inNode = {};
  const nodes_outNode = {};
  const nodes_inEdge = {};
  const nodes_outEdge = {};

  const workSet = new Set();

  function clear() {
    nodes.value = [];
    edges.value = [];
    workSet.clear();
  }

  function WorkNode(id, work) {
    return { id, position: { x: 0, y: 0 }, label: work, type: "pending" };
  }

  function WorkEdge(id, source, target) {
    return { id, source, target, animated: true, markerEnd: MarkerType.ArrowClosed };
  }

  function buildGraph(initEdges) {
    clear();
    for (const [from, to] of initEdges) {
      buildNode(from);
      buildNode(to);
      buildEdge(from, to);
    }
    return { nodes, edges };
  }

  function buildNode(work) {
    if (!workSet.has(work)) {
      workSet.add(work);
      nodes.push(new WorkNode(work, work));
    }
  }

  function buildEdge(from, to) {
    edges.push(new WorkEdge(`${from}-${to}`, from, to));
  }

  return {
    buildGraph,
  };
}
