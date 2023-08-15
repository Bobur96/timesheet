import { useEffect, useState } from "react";
import arrow from "../assets/arrow.png";
import calendarImg from "../assets/calendar.png";
import { ToastContainer, toast } from "react-toastify";

export default function Timesheet() {
  const query = document.querySelector.bind(document);
  const queryAll = document.querySelectorAll.bind(document);
  const inputs = queryAll("input");
  const labels = queryAll("label");
  const [spans, setSpans] = useState([]);
  const h4 = query("#h4");
  const [users, setUsers] = useState([1, 2, 3]);
  const eventArr = [];
  const [projects, setProjects] = useState([]);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const thisDay = new Date();
  let year = thisDay.getFullYear();
  let monthNumber = thisDay.getMonth();
  let monthName = month[monthNumber];

  let first = new Date().getDate() - new Date().getDay() + 1;
  let firstday = new Date(new Date().setDate(first));
  let d = new Date(
    firstday.getFullYear(),
    firstday.getMonth(),
    firstday.getDate()
  );

  useEffect(() => {
    console.log('useeff');
    setSpans(queryAll("span"));
    fetch("https://sil-timesheet-api.herokuapp.com/api/sil/v1/projects")
    .then(response => response.json())
    .then(data => setProjects(data));
  }, []);

  setTimeout(() => {
    counDay(d);
  }, 10);

  function counDay(d) {
    spans.forEach((el, i) => {
      d.getDate() === new Date().getDate() &&
      d.getMonth() === new Date().getMonth() &&
      d.getFullYear() === new Date().getFullYear()
        ? (el.style.color = "red")
        : (el.style.color = "black");
      el.textContent = d.getDate();
      h4.textContent = month[d.getMonth()] + " " + d.getFullYear() + " |";

      users.forEach((user, number) => {
        queryAll(`.Table${number}`)[i].disabled = false;
        eventArr.forEach((event, j) => {
          if (
            event.name ===
            d.getDate() +
              " " +
              d.getMonth() +
              " " +
              d.getFullYear() +
              ` Table${number}`
          ) {
            queryAll(`.Table${number}`)[i].value = event.value;
            queryAll(`.Table${number}`)[i].disabled = true;
          }
        });
      });
      totalHour();
      d.setDate(d.getDate() + 1);
    });
  }

  function clearInputs() {
    inputs.forEach((el) => {
      el.value = "";
    });
    labels.forEach((el) => {
      el.textContent = 0;
    });
    query(".total_hour").textContent = 0;
  }

  function prev() {
    clearInputs();
    for (let i = 0; i < 14; i++) {
      d.setDate(d.getDate() - 1);
    }
    counDay(d);
  }

  function next() {
    clearInputs();
    counDay(d);
  }

  function getToday() {
    first = new Date().getDate() - new Date().getDay() + 1;
    firstday = new Date(new Date().setDate(first));
    d = new Date(
      firstday.getFullYear(),
      firstday.getMonth(),
      firstday.getDate()
    );
    counDay(d);
  }

  function saveEvent() {
    users.forEach((user, number) => {
      queryAll(`.Table${number}`).forEach((el) => {
        if (el.value) {
          eventArr.push({
            name:
              d.getDate() -
              7 +
              1 * el.id +
              " " +
              d.getMonth() +
              " " +
              d.getFullYear() +
              ` Table${number}`,
            value: el.value,
          });
          el.disabled = true;
        }
      });
    });
    toast.success("Successfully Saved");
  }

  inputs.forEach((li) => {
    li.addEventListener("change", function (e) {
      totalHour();
    });
  });

  function totalHour() {
    let totalSum = 0;
    users.map((el, number) => {
      let sum = 0;
      queryAll(`.Table${number}`).forEach((s) => {
        sum += 1 * s.value;
      });
      query(`#label${number}`).textContent = sum;
      totalSum += sum;
    });
    query(".total_hour").textContent = totalSum;
  }

  return (
    <div className="d-flex my-5 justify-content-center">
      <ToastContainer autoClose={900} />
      <form
        className="col-2 d-flex flex-column gap-2 mt-5"
        style={{ paddingTop: "80px" }}
      >
        {users.map((user, id) => (
          // <input key={id} id={id} type="text"/>
          <select className="form-select form-select-sm" key={id} id={id} required>
            <option value="">Select Items</option>
            {
              projects.map(pro=>(
                <option key={pro.id} value={pro.project_name}>{pro.project_name}</option>
              ))
            }
          </select>
        ))}
      </form>
      <div className="col-9">
        <div className="d-flex justify-content-between align-items-center px-3">
          <img onClick={prev} src={arrow} className="img one" alt="" />
          <div className="d-flex align-items-center">
            <h4 id="h4" className="text-center my-3">
              {monthName + " " + year} |{" "}
            </h4>
            <button id="btn" className="btn" onClick={getToday}>
              <img src={calendarImg} alt="" /> Today
            </button>
          </div>
          <img onClick={next} src={arrow} className="img" alt="" />
        </div>
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>
                  Monday <br />
                  <span>4</span>
                </th>
                <th>
                  Tuesday <br />
                  <span>5</span>
                </th>
                <th>
                  Wednesday <br />
                  <span>6</span>
                </th>
                <th>
                  Thursday <br />
                  <span>7</span>
                </th>
                <th>
                  Friday <br />
                  <span>8</span>
                </th>
                <th className="table-active">
                  Saturday <br />
                  <span>9</span>
                </th>
                <th className="table-active">
                  Sunday <br />
                  <span>10</span>
                </th>
                <th className="table-primary">
                  Total hours
                  <br />
                  <div className="total_hour">0</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((el, number) => (
                <tr id="first" key={number}>
                  {weekday.map((el, i) => (
                    <td key={i}>
                      <input
                        className={`Table${number}`}
                        key={i}
                        id={i}
                        type="number"
                        onWheel={(event) => {
                          document.activeElement.blur();
                        }}
                      />
                    </td>
                  ))}
                  <td className="table-primary">
                    <label id={`label${number}`}>0</label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={saveEvent} className="btn btn-success float-end">
          submit
        </button>
      </div>
    </div>
  );
}
