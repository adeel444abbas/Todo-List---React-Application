import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    task: "",
    status: "",
  });
  const [finalData, setFinalData] = useState([]);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!displayEdit) {
      let id = new Date().getTime().toExponential();
      let dataWithID = { ...formData, id: id };
      console.log("formData:", dataWithID);
      setFinalData([...finalData, dataWithID]);
      setFormData({
        task: "",
        status: "",
      });
    } else {
      const updateTask = finalData.map((data) =>
        data.id === editID ? { ...formData, editID } : data
      );
      setFinalData(updateTask);
      setDisplayEdit(false);
      setEditID(null);
      setFormData({
        task: "",
        status: "",
      });
    }
  };

  const handleEdit = (data) => {
    console.log("data:", data);
    setFormData(data);
    setDisplayEdit(true);
    setEditID(data.id);
  };

  const handleDelete = (id) => {
    console.log("id", id);
    let deletedData = finalData.filter((data) => data.id !== id);
    setFinalData(deletedData);
  };

  return (
    <>
      <div className="container">
        <h1>To Do App</h1>
        <form className="form">
          <input
            type="text"
            name="task"
            value={formData.task}
            placeholder="Enter Task"
            onChange={handleChange}
          />
          <input
            type="text"
            name="status"
            value={formData.status}
            placeholder="Status"
            onChange={handleChange}
          />
          <button onClick={handleClick}>
            {displayEdit ? "Edit" : "Submit"}
          </button>
        </form>
        <div className="tasksContainer">
          {finalData.map((data) => {
            return (
              <div className="tasks" key={data.id}>
                <p>{data.task}</p>
                <p>{data.status}</p>
                <button className="editBtn" onClick={() => handleEdit(data)}>
                  Edit
                </button>
                <button
                  className="delBtn"
                  onClick={() => handleDelete(data.id)}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
