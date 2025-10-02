// const date = new Date().toISOString();
// let d1 = new Date();
// console.log(date);

// const id = date.replace(/:/g, "-");
// console.log(id);

// let splitDate = id.split("-");
// console.log(splitDate);

// const neu = splitDate[3] + splitDate[4].slice(0, 2);
// console.log(neu);

function generator() {
  let counter = 0;

  return () => {
    // fresh timestamp each call
    const d = new Date().toISOString();
    // parts = ["2025", "10", "01T15", "45", "30.123Z"]
    let parts = d.replace(/:/g, "-").split("-");

    const front = parts[3] + parts[4].slice(0, 2); // e.g. "4530"
    const end = String(counter++).padStart(2, "0"); // ensures 2-digit counter

    const id = `${front}${end}`;

    console.log(id);
    return id;
  };
}
const idGenerator = generator();
// idGenerator();
module.exports = idGenerator;
