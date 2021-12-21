//import libraries
import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";

//import images
import t from "./t.png";

//import styles
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [task, setTask] = useState("");
  const [assign, setAssign] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [list, setList] = useState([]);

  //Functions
  const handleAdd = () => {
    setIsAdding(!isAdding);
  };

  function handleSave(e) {
    e.preventDefault();
    if (!task || !assign) {
    } else {
      setIsAdding(!isAdding);
      setList([
        ...list,
        {
          date: startDate.toString(),
          id: startDate.getTime(),
          task: task,
          assign: assign,
        },
      ]);
      setTask("");
      setAssign("");
      setStartDate(new Date());
    }
  }

  function handleRemove(id) {
    let newList = list.filter((item) => item.id !== id);
    setList(newList);
  }
  
  //Sort the list
  const sortedList = list.sort((a, b) => a.id - b.id);

  return (
    <div className="container">
      {/* Add Tasks */}
      <div className="box1">
        {isAdding ? (
          <form className="boxIn" onSubmit={handleSave}>
            <input
              autoFocus
              className="inputField"
              placeholder="Task ✍️"
              value={task}
              onInput={(e) => setTask(e.target.value)}
            />
            <input
              className="inputField"
              placeholder="Assigned To 👩‍"
              value={assign}
              onInput={(e) => setAssign(e.target.value)}
            />
            <div className="inputField">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <button type="submit" className="saveBtn">
              Save
            </button>
          </form>
        ) : (
          <div className="boxIn">
            <h1>📈 Todo</h1>
            <button className="btn" onClick={handleAdd}>
              +Add Task
            </button>
          </div>
        )}
      </div>
       {/* Display Tasks */}
      <div className="box2">
        {sortedList.length === 0 ? (
          <center>
            <h1>🌞 You have no tasks yet!</h1>
          </center>
        ) : (
          sortedList.map((item) => {
            return (
              <div className="box3">
                <p>{item.task}</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "0.8rem" }}>
                      Assigned To: {item.assign}
                    </p>
                    <p style={{ fontSize: "0.8rem" }}>
                      Due By: {item.date.slice(0, 10)} {}
                    </p>
                  </div>
                  <button
                    className="btnDel"
                    onClick={() => handleRemove(item.id)}
                  >
                    <img src={t} style={{ height: "30px" }} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
