import {useLocation} from "react-router";


function Employee() {
  const {state}=useLocation();
  
  return (
    <div className="p-14 text-2xl text-center ring-1 ring-blue-700 shadow-2xl m-auto rounded-3xl max-w-md ">
      <p className="mb-2">Name : {state.Name}</p>
      <p className="mb-2">Email : {state.Email}</p>
      <p className="mb-2">Mobile : {state.Mobile}</p>
      <p className="mb-2">Designation : {state.Designation}</p>
      <p className="mb-2">CompanyName : {state.Company}</p>
      
    </div>
  )
}

export default Employee