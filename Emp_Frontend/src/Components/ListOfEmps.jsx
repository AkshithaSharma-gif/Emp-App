import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function ListOfEmps() {
  const [emps, setEmps] = useState([]);

  const navigate=useNavigate();

  function goToEmployee(empObj){
    //navigating along with selected emp object
    navigate("/employee",{state:empObj});
    
  }

  function goToEditEmp(empObj){
    //navigating along with selected emp object
    navigate("/edit-emp",{state:empObj});
  }

  const DeleteEmpByEmail=async (Email)=>{
    let res=await axios.delete(`http://localhost:4000/employee-api/employees/${Email}`,Email)
    console.log(res)
    if(res.status===200){
      getEmps();
    }
  }

  async function getEmps() {
      let res = await fetch("http://localhost:4000/employee-api/employees",{method:"GET"});
      if (res.status === 200) {
        let resObj = await res.json();
        setEmps(resObj.payload);
      }
    }

  useEffect(() => {
    getEmps();
  }, []);


  return (
    <div>
      <h1 className="text-4xl text-center">List of Employees</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {emps.map((empObj) => (
          <div key={empObj._id} className=" bg-white p-5">
            <p>{empObj.Name}</p>
            <p className="mb-3">{empObj.Email}</p>
            {/* 3 bottons */}
            <div className="flex justify-around rounded-3xl">
              <button onClick={()=>goToEmployee(empObj)} className="bg-blue-400 rounded-2xl p-2 px-5">View</button>
              <button onClick={()=>goToEditEmp(empObj)} className="bg-green-400 rounded-2xl p-2 px-5">Edit</button>
              <button onClick={()=>DeleteEmpByEmail(empObj.Email)} className="bg-red-400 rounded-2xl p-2 px-5">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfEmps;