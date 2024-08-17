import { ref } from "vue";

export function useWorkGraph() {
  const nodes = [];
  const edges = [];

  const workSet = new Set();

  function clear() {
    nodes.value = [];
    edges.value = [];
    workSet.clear();
  }

  function WorkNode(id, work) {
    return { id, position: { x: 0, y: 0 }, label: work, type: "default" };
  }

  function WorkEdge(id, source, target) {
    return { id, source, target };
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
