async function getReportData () {
    const [chData, setChFata] = useState("");
    await axios.post(`${linkNode}/chartdata`).then(async (res) => {
      let fromData = res.data;
      let toData = [];
  
      for(let i = 0; i < fromData.length; i++){
        toData.push({
          bikes: fromData[i].bikes,
          buses: fromData[i].buses,
          cars: fromData[i].cars,
          trucks: fromData[i].trucks,
        });
      }
  
      setChFata(toData);
    });
  }
  getReportData();