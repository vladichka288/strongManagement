function getWorkersByWork(objectOfWorkers, objectWork) {
  if (objectWork.workers) {
    console.log(objectWork, "objectWork");
    console.log(objectOfWorkers, "objectOfWorkers");

    let workers = Object.keys(objectOfWorkers).map((key) => {
      if (objectWork.workers.includes(objectOfWorkers[key].userId)) {
        return { ...objectOfWorkers[key], id: key };
      } else {
        return null;
      }
    });
    let returnArray = workers.filter((worker) => worker != null);
    console.log(workers, "workers");
    return { error: null, workers: returnArray };
  } else {
    return { error: "Ooops, nobody works at this job", workers: [] };
  }
}
export default getWorkersByWork;
