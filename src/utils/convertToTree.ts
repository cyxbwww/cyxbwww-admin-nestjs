export const convertToTree = (routeList, parentId: number | null = null) => {
  const tree = [];

  for (let i = 0; i < routeList.length; i++) {
    if (routeList[i].parentId === parentId) {
      const children = convertToTree(routeList, routeList[i].id);
      if (children.length) {
        routeList[i].children = children;
      }
      tree.push(routeList[i]);
    }
  }

  return tree;
};
