import React, { useEffect, useState } from 'react';
import './formdatas.css'
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import { getDatabase, ref, set, push } from 'firebase/database';





const FormDatas = () => {

const handleChange = (event) => {
var regionEl = document.getElementById('region').value;
var zoneSelect = document.getElementById('zone');

 zoneSelect.innerHTML = '';

  if (regionEl === 'Upper Mainland 1') {
                var zoneArea1 = ['Zone A', 'Zone B'];
                populateOptions(zoneArea1);


            } else if (regionEl === 'Upper Mainland 2') {
                var zoneArea2 = ['Select Zone', 'Zone C'];
                populateOptions(zoneArea2);


            }else if(regionEl === 'Lower MainLand'){
                   var zoneArea3 = ['Zone A', 'Zone B'];
                populateOptions(zoneArea3);
            }


            else if(regionEl === 'Island 1'){
                   var zoneArea4 = ['Ikoyi', 'Victoria Island'];
                populateOptions(zoneArea4);
            }

            else if(regionEl === 'Island 2'){
                   var zoneArea5 = ['Lekki', 'Ajah'];
                populateOptions(zoneArea5);
            }

            else if(regionEl === 'North 1'){
                   var zoneArea6 = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'];
                populateOptions(zoneArea6);
            }

            else if(regionEl === 'North 2'){
                   var zoneArea7 = ['Kano', 'Kaduna'];
                populateOptions(zoneArea7);
            }

            else if(regionEl === 'East 1'){
                   var zoneArea8 = ['Portharcourt Zone A', 'Portharcourt Zone B'];
                populateOptions(zoneArea8);
            }

            else if(regionEl === 'East 2'){
                   var zoneArea9 = ['Asaba'];
                populateOptions(zoneArea9);
            }

            else if(regionEl === 'West'){
                   var zoneArea9b = ['Oyo', 'Osun', 'Ekiti', 'Ondo', 'Ogun', 'Kwara'];
                populateOptions(zoneArea9b);
            }

}

function populateOptions(options) {
               var zoneSelect = document.getElementById('zone');
            options.forEach(function(option) {
                var optionElem = document.createElement('option');
                optionElem.textContent = option;
                zoneSelect.appendChild(optionElem);
            });
        }


        const handleMessageSwitch = (event) =>{
            var selectBox = document.getElementById("kit");
            var textDiv = document.getElementById("box");

            if (selectBox.value === "Incomplete") {
                textDiv.style.display = "block";
            } else {
                textDiv.style.display = "none";
            }
        }


         const [formData, setFormData] = useState({
    name: "",
    Time: "",
    Mode_of_Patrol: "",
    Date: "",
    Region: "",
    Zone: "",
    Name_of_Location: "",
    Name_of_Supervisor: "",
    Guard_Strength: "",
    Guards_Absent: "",
    Reason: "",
    CUG: "",
    Guard_Tour: "",
    Documentation_Status: "",
    Panic_Alarm: "",
    Handheld_Scanner: "",
    Kitting_Status: "",
    Message: "",
    //Documentation Status Add more fields as needed
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


 

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    
    if (user) {
      try {
        const db = getDatabase();
        const userFormRef = ref(db, 'users/' + user.uid + '/formData');
        const newFormRef = push(userFormRef); // Generate a new key for each form submission


        const formDataWithTimestamp = {
          ...formData,
          timestamp: new Date().toISOString(),
          nameLower: formData.name.toLowerCase()
        };

      await set(newFormRef, formDataWithTimestamp); 
        toast.success('Data saved successfully!');
      } catch (error) {
        console.error('Error saving data:', error.message);
        toast.error('Error saving data');
      }
    } else {
      toast.error('User not logged in');
    }
  };

 useEffect(() => {
 console.log(formData);
}, [formData])

  return (
    <div className="container frms mt-5 py-5">
    <div className="title ">
     <h1 className="text-center">Patrol Report</h1>
     <p className="text-center">This form is to capture the patrol of zonal assistants especially where they discharge their duties of visiting locations and maintaining Halogen standards</p>
    </div>
     <div className="">
   
  <form action="" className="mt-5" onSubmit={handleFormSubmit} method="post" name="submit-to-google-sheet">
    <div className="row">
    <div className="col-lg-3 mb-3">
  <label className="lab">Name of ZA</label>
     <input type="text" required className="form-control" value={formData.name} onChange={onChangeHandler} name="name" id="name" autoComplete="off"/>
    </div>

    <div className="col-lg-3 mb-3">
  <label className="lab">Time of Arrival</label>
     <input type="time" className="form-control" value={formData.Time} onChange={onChangeHandler} required name="Time" id="time" autoComplete="off"/>
    </div>
    <div className="col-lg-3 mb-3">
  <label className="lab">Mode of Patrol</label>
<div className="form-check">
  <input className="form-check-input" name="Mode_of_Patrol" onChange={onChangeHandler} type="checkbox" value="Day Patrol" id="day"/>
  <label className="form-check-label" htmlFor="flexCheckDefault">
    Day Patrol
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" value="Motorized"  onChange={onChangeHandler} name="Mode_of_Patrol" type="checkbox"  id="night"/>
  <label className="form-check-label" htmlFor="flexCheckDefault">
    Motorize Patrol
  </label>
</div>
    </div>

    <div className="col-lg-3 mb-3">
  <label className="lab">Date</label>
     <input type="date" className="form-control" value={formData.Date}  onChange={onChangeHandler} required name="Date" id="time" autoComplete="off"/>
    </div>
      
    <div className="col-lg-3 mb-3">
  <label className="lab">Region</label>
    <select className="form-select" value={formData.Region} required name="Region" id="region" onChange={(event) => {handleChange(event)
  onChangeHandler(event)}}aria-label="Default select example">
  <option placeholder="select a region" ></option>
  <option value="Upper Mainland 1">Upper Mainland 1</option>
  <option value="Upper Mainland 2">Upper Mainland 2</option>
  <option value="Lower MainLand">Lower MainLand</option>
  <option value="Island 1">Island 1</option>
  <option value="Island 2">Island 2</option>
  <option value="North 1">North 1</option>
  <option value="North 2">North 2</option>
  <option value="East 1">East 1</option>
  <option value="East 2">East 2</option>
  <option value="West">West</option>

</select>
    </div>

    <div className="col-lg-3 mb-3">
  <label className="lab">Zone</label>
         <select id="zone" name="Zone"value={formData.Zone}   onChange={onChangeHandler} required className="form-select" aria-label="Default select example">
     
    </select>

    </div>

    <div className="col-lg-3 mb-3">
  <label className="lab">Name of Location</label>
    <input type="text" name="Name_of_Location" value={formData.Name_of_Location}  onChange={onChangeHandler} required className="form-control" id="location" autoComplete="off"/>

    </div>
    <div className="col-lg-3 mb-3">
  <label className="lab">Name of Supervisor</label>
    <input type="text" name="Name_of_Supervisor" value={formData.Name_of_Supervisor}  onChange={onChangeHandler} required className="form-control" id="supervisor" autoComplete="off"/>

    </div>
    <div className="col-lg-3 mb-3">
  <label className="lab">Guard Strength</label>
    <input type="number" onChange={onChangeHandler} value={formData.Guard_Strength}  name="Guard_Strength" required className="form-control" id="gstr" autoComplete="off"/>

    </div>
    <div className="col-lg-3 mb-3">
  <label className="lab">Number of guards Absent</label>
    <input type="number"  onChange={onChangeHandler} value={formData.Guards_Absent}  name="Guards_Absent" required className="form-control" id="abs" autoComplete="off"/>

    </div>


    <div className="col-lg-3 mb-3">
  <label className="lab">Reason</label>
  <div className="form-check">
  <input className="form-check-input" value="Short Manning"  onChange={onChangeHandler} name="Reason" type="checkbox"   id="shman"/>
  <label className="form-check-label" htmlFor="flexCheckDefault">
    Short Manning
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" value="Absenteeism" onChange={onChangeHandler} name="Reason" type="checkbox" id="Absent"/>
  <label className="form-check-label" htmlFor="flexCheckChecked">
    Absenteeism
  </label>
</div>

    </div>
      
    <div className="col-lg-3 mb-3">
  <label className="lab">Documentation Status</label>
  <div className="form-check">
  <input className="form-check-input" onChange={onChangeHandler} name="Documentation_Status" type="checkbox" value='Complete and Current'  id="cc"/>
  <label className="form-check-label"  htmlFor="flexCheckDefault">
    Complete and Current
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" value="Site Specific" onChange={onChangeHandler} type="checkbox"  name="Documentation_Status"  id="ss"/>
  <label className="form-check-label"  htmlFor="flexCheckChecked">
    Site Specific
  </label>
</div>
<div className="form-check">
  <input className="form-check-input"  onChange={onChangeHandler} name="Documentation_Status" type="checkbox" value='Incomplete' id="in"/>
  <label className="form-check-label" htmlFor="flexCheckChecked">
    Incomplete
  </label>
</div>

    </div>
      
        <h4>Number of Device and Status</h4>

             <div className="col-12">
           <table className="table-striped table">
            <thead>
                <tr>
                    <th>Name of Device</th>
                    <th>Active</th>
                    <th>Faulty</th>
                    <th>Not Deployed</th>
                </tr>
            </thead>
            <tbody>
             <tr>
               <td><label htmlFor="">Cug</label></td>
               <td> <input className="form-check-input" checked={formData.CUG === "Active"}  onChange={onChangeHandler} type="checkbox" name="CUG"  value="Active" id="gtf"/></td>
               <td> <input className="form-check-input" checked={formData.CUG === "Faulty"}  onChange={onChangeHandler} type="checkbox" name="CUG" value="Faulty" id="active"/></td>
               <td> <input className="form-check-input" checked={formData.CUG === "Not Deployed"}  onChange={onChangeHandler} type="checkbox" name="CUG"  value="Not Deployed" id="notd"/></td>
                
             </tr>
             <tr>
               <td><label htmlFor="">Guard Tour</label></td>
               <td> <input className="form-check-input" checked={formData.Guard_Tour === "Active"}  onChange={onChangeHandler} type="checkbox" name="Guard_Tour" value="Active" id="gtf"/></td>
               <td> <input className="form-check-input" onChange={onChangeHandler} checked={formData.Guard_Tour === "Faulty"}  type="checkbox" name="Guard_Tour" value="Faulty" id="gta"/></td>
               <td> <input className="form-check-input" checked={formData.Guard_Tour === "Not Deployed"}  onChange={onChangeHandler} type="checkbox" name="Guard_Tour" value="Not Deployed" id="gtn"/></td>
                
             </tr>
             <tr>
               <td><label htmlFor="">Panic Alarm</label></td>
               <td> <input className="form-check-input" checked={formData.Panic_Alarm === "Active"} onChange={onChangeHandler}  type="checkbox" name="Panic_Alarm" value="Active" id="gtf"/></td>
               <td> <input className="form-check-input" checked={formData.Panic_Alarm === "Faulty"}  onChange={onChangeHandler} type="checkbox" name="Panic_Alarm" value="Faulty" id="pta"/></td>
               <td> <input className="form-check-input"  checked={formData.Panic_Alarm === "Not Deployed"} onChange={onChangeHandler} type="checkbox"  name="Panic_Alarm" value="Not Deployed" id="ptn"/></td>
                
             </tr>
             <tr>
               <td><label htmlFor="">Handheld Scanner</label></td>
               <td><input  className="form-check-input" checked={formData.Handheld_Scanner === "Active"}   onChange={onChangeHandler} type="checkbox"   name="Handheld_Scanner" value="Active" id="gtf"/></td>
               <td> <input className="form-check-input" checked={formData.Handheld_Scanner === "Faulty"}  onChange={onChangeHandler}  type="checkbox" name="Handheld_Scanner" value="Faulty" id="hsa"/></td>
               <td> <input className="form-check-input" checked={formData.Handheld_Scanner === "Not Deployed"}  onChange={onChangeHandler}  type="checkbox" name="Handheld_Scanner" value="Not Deployed" id="hsn"/></td>
                
             </tr>
            </tbody>

        </table>
         </div>

           <div className="col-lg-3 mb-3">
  <label className="lab">Kitting Status</label>
    <select className="form-select" required  onChange={(event) => {handleMessageSwitch(event)
  onChangeHandler(event)}} name="Kitting_Status" id="kit"  aria-label="Default select example">
  <option>Select</option>
  <option value="Complete">Complete</option>
  <option value="Incomplete">Incomplete</option>
 

</select>
    </div>

    <div className="col-12" id="box"  >
<label className="lab">Tell us what they need</label>
    <textarea name="Message" rows="3" id="mes"  onChange={onChangeHandler}  className="form-control"></textarea>
    </div>


      </div>
       <button type="submit" className="--btn-dark  my-3"style={{ backgroundColor: '#17265D', color: '#fff' }} >Submit Data</button>
  </form>
 
     </div>
     
    
    
</div>
  )
}

export default FormDatas