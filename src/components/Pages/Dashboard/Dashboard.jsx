import React, { useEffect, useState } from 'react';
import './dashboard.css'
import firebase from "../../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from 'react-toastify';
import { getDatabase, ref, get, query, orderByChild, equalTo, startAt, endAt } from 'firebase/database';
import { CSVLink } from "react-csv";

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [formCount, setFormCount] = useState(null);
  const [user, setUser] = useState(null);
const [formDataList, setFormDataList] = useState([]);
  const [searchedUserName, setSearchedUserName] = useState('');
   const [endDate, setEndDate] = useState('');
   const [startDate, setStartDate] = useState('');
    

  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('User authenticated:', user); // Debugging log

        setUser(user);
        const db = getDatabase(firebase);
        const adminRef = ref(db, 'admins');
        const adminSnapshot = await get(adminRef);

        if (adminSnapshot.exists()) {
          const adminData = adminSnapshot.val();
          if (adminData.email === user.email && adminData.isAdmin) {
            console.log('User is an admin'); // Debugging log
          } 
        } 
      } 
    });
  }, []);


 




  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };



const handleSearch = async (e) => {
  e.preventDefault();

  if (!userName) {
    toast.error('Please enter a user name');
    return;
  }

  if (!user) {
    toast.error('User not authenticated');
    return;
  }

  try {
    const db = getDatabase(firebase);
    const usersRef = ref(db, 'users');
    const userQuery = query(usersRef, orderByChild('name'), equalTo(userName));
    const userSnapshot = await get(userQuery);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      const userUID = Object.keys(userData)[0];
      // Fetch the form submissions for the found user UID
      const userFormsRef = ref(db, `users/${userUID}/formData`);
      let formsSnapshot;

      if (startDate && endDate) {
       const start = new Date(startDate).setHours(0, 0, 0, 0);
       const end = new Date(endDate).setHours(23, 59, 59, 999);
         const formsQuery = query(userFormsRef, orderByChild('timestamp'), startAt(new Date(start).toISOString()), endAt(new Date(end).toISOString()));
        formsSnapshot = await get(formsQuery);
      } else {
        formsSnapshot = await get(userFormsRef);
      }

      if (formsSnapshot.exists()) {
        const formData = formsSnapshot.val();
         console.log('Form Data:', formData);
          setFormCount(Object.keys(formData).length);
          setFormDataList(Object.values(formData));
      } else {
        toast.error('No form submissions found for this user during this period');
        setFormCount(0);
        setFormDataList([]);

      }

      setSearchedUserName(userName);


    } else {
      toast.error('User not found');
      setFormCount(null);
      setFormDataList([]);
      setSearchedUserName('');
    }
  } catch (error) {
    console.error('Error fetching form data:', error);
    toast.error('Error fetching form data', error);
  }
};


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const db = getDatabase(firebase);
        const adminRef = ref(db, `admins`);
        const adminSnapshot = await get(adminRef);

        if (adminSnapshot.exists()) {
          const adminsData = adminSnapshot.val();
          const isAdmin = Object.values(adminsData).some(admins => admins.email === user.email && admins.isAdmin === 'true');

          if (isAdmin) {
            
            console.log(adminsData);
            console.log(isAdmin);
          }
        } 
      } 
    });
  }, []);


    const csvHeaders = [
    { label: "Name", key: "name" },
    { label: "Time", key: "Time" },
    { label: "Mode Of Patrol", key: "Mode_of_Patrol" },
    { label: "Date", key: "Date" },
    { label: "Region", key: "Region" },
    { label: "Zone", key: "Zone" },
    { label: "Name of Location", key: "Name_of_Location" },
    { label: "Name of Supervisor", key: "Name_of_Supervisor" },
    { label: "Guard Strength", key: "Guard_Strength" },
    { label: "Guards Absent", key: "Guards_Absent" },
    { label: "Reason", key: "Reason" },
    { label: "Documentation Status", key: "Documentation_Status" },
    { label: "CUG", key: "CUG" },
    { label: "Guard Tour", key: "Guard_Tour" },
    { label: "Panic Alarm", key: "Panic_Alarm" },
    { label: "Handheld Scanner", key: "Handheld_Scanner" },
    { label: "Kitting Status", key: "Kitting_Status" },
    { label: "Message", key: "Message" },
  ];



  return (
    <div className='py-5 container-fluid'>
      <h1 className='--mt3 --fw-bold'>Query Patrol Data</h1>
      <form action="" onSubmit={handleSearch}>
        <div className="inps --mt2">
          <div className="from">
            <label htmlFor="">Query by Call sign</label>
            <input type="text" onChange={handleInputChange}  className='form-control' placeholder='Call sign' />
          </div>
          <div className="from">
            <label htmlFor="" className='--fw-bold'>Start Date</label>
             <input type="date" onChange={(e) => setStartDate(e.target.value)}  placeholder="Enter date" className='form-control' />
          </div>
          <div className="from">
            <label htmlFor="" className='--fw-bold'>End Date</label>
            <input type="date" onChange={(e) => setEndDate(e.target.value)} className='form-control' />
          </div>
            <button type='submit' className="btn" style={{ backgroundColor: '#17265D', color: '#fff' }}>Query</button>
        </div>
     
      </form>
      <div className="row --mt3">
        <div className="col-lg-3 col-md-4">
          <h4 className='--fw-bold'>Total Patrol</h4>
          {formCount !== null && (
            <div>
              <h6>Total Patrol for  {searchedUserName}: {formCount}</h6>
            </div>
          )}
        </div>
        <div className='col-md-12 --mt3 col-lg-12'>
       {formDataList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Mode Of Patrol</th>
                <th>Date</th>
                <th>Region</th>
                <th>Zone</th>
                <th>Name of Location</th>
                <th>Name of Supervisor</th>
                <th>Guard Strength</th>
                <th>Guards Absent</th>
                <th>Reason</th>
                <th>Documentation Status</th>
                <th>CUG</th>
                <th>Guard Tour</th>
                <th>Panic Alarm</th>
                <th>Handheld Scanner</th>
                <th>Kitting Status</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody className='tbod'>
              {formDataList.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.Time}</td>
                  <td>{data.Mode_of_Patrol}</td>
                  <td>{data.Date}</td>
                  <td>{data.Region}</td>
                  <td>{data.Zone}</td>
                  <td>{data.Name_of_Location}</td>
                  <td>{data.Name_of_Supervisor}</td>
                  <td>{data.Guard_Strength}</td>
                  <td>{data.Guards_Absent}</td>
                  <td>{data.Reason}</td>
                  <td>{data.Documentation_Status}</td>
                  <td>{data.CUG}</td>
                  <td>{data.Guard_Tour}</td>
                  <td>{data.Panic_Alarm}</td>
                  <td>{data.Handheld_Scanner}</td>
                  <td>{data.Kitting_Status}</td>
                  <td>{data.Message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No form data available</p>
        )}
        
        </div>

         {formDataList.length > 0 && (
            <div className=' --flex-center --mt2'>
              <CSVLink className='' data={formDataList} headers={csvHeaders} filename={`${userName}_form_data.csv`}>
                <button className="btn" style={{ backgroundColor: '#17265D', color: '#fff' }}>Export as CSV</button>
              </CSVLink>
            </div>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
