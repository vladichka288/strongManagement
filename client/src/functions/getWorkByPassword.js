function getWorkByPassword(workObject, password) {
  let workArray = Object.keys(workObject).map((key) => {
    return { ...workObject[key], id: key };
  });
  for (let i = 0; i < workArray.length; i++) {
    if (workArray[i].password == password) {
      return { error: null, work: workArray[i] };
    }
  }

  return { error: "There is no work with this password", work: null };
}
export default getWorkByPassword;
