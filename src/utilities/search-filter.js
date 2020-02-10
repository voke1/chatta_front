const searchFilter = (array, term, exclude) => {
  const objects = [];
  if (array.length) {
    const keys = Object.keys(array[0]);
    if (exclude && exclude.length) {
      for (let index = 0; index < exclude.length; index += 1) {
        if (keys.indexOf(exclude[index]) > -1) {
          const excludeKey = keys.indexOf(exclude[index]);
          keys.splice(excludeKey, 1);
        }
      }
    }
    array.forEach(object => {
      for (let index = 0; index < keys.length; index += 1) {
        if (
          object[keys[index]]
            .toString()
            .toLowerCase()
            .includes(term.toLowerCase())
        ) {
          if (!objects.includes(object, 0)) {
            objects.push(object);
          }
        }
      }
    });
  }

  return objects;
};
export default searchFilter;
