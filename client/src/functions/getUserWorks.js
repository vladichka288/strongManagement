function getUserWorks(userId, worksObject) {
  let worksArray = [];
  Object.keys(worksObject).map((key) => {
    if (worksObject[key].ownerId == userId) {
      worksArray.push({ ...worksObject[key], id: key });
    }
  });
  return worksArray;
}
export default getUserWorks;