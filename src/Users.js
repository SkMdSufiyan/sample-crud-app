import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import { Container, Button, Table} from "reactstrap";



export default function Users(){
    // The mock-API url used
    const url = "https://639ac1bf31877e43d6751029.mockapi.io/usersPage/";

    // Initialising state for usersData. "usersData" is for data of all users
    const [usersData, setUsersData] = useState([]);
    const navigate = useNavigate();

    // "getAllUserDetails" function is for fetcing the data of all users
    const getAllUserDetails = async ()=>{
        let allUsersData = await fetch(url).then(dat=>dat.json()).then(res=>{setUsersData(res)});
    }

    // Using "useEffect" to execute the "getAllUserDetails" function whenever the state changes
    useEffect(()=>{
        getAllUserDetails();
    },[])


    // "handleDelete" function is for deleting single user at atime
    const handleDelete = async (id) => {
        let deleteUserData = await fetch(url+id,{
            method:"DELETE"
        }).then(dat=>{
            getAllUserDetails();
        });
    }

    // The data to be shown in the web page
    return(
        <Container style={{marginTop:"20px", marginBottom:"100px"}}>
            <h6>Users list</h6>
            <br />

            {/* Button for going back to the dashboard */}
            <Button color="warning" style={{fontSize:"small"}} onClick={()=>navigate('/')}>Back to dashboard</Button>
            <br />
            <br />

            {/* Table for displaying the data of all users */}
            <Table striped>
                <thead>
                <tr>
                    <th>Sl. No.</th>                    
                    <th>UserName</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>

                    {/* Applying map function to iterate through all the users */}
                   {usersData.map((value,index)=>{
                    return(
                        <tr>
                            <td>{index+1}</td>
                            <td>{value.username}</td>
                            <td>{value.name}</td>
                            <td>{value.email}</td>
                            <td>{value.address}</td>
                            <td>

                                {/* Button to view the profile of that user */}
                                <Button color="info" style={{margin:"0px 5px", fontSize:"small"}} onClick={()=>navigate("/profile/"+value.id)}>View Prof</Button>

                                {/* Button for editing the users data (the data that is being shown in users page  */}
                                <Button color="warning" style={{margin:"0px 5px", fontSize:"small"}} onClick={()=>navigate("/edit-user/"+value.id)}>Edit User</Button>

                                {/* Button for deleting that user */}
                                <Button color="danger" style={{margin:"0px 5px", fontSize:"small"}} onClick={()=>handleDelete(value.id)}>Delete User</Button>
                            </td>
                        </tr>
                    )
                   })}
                </tbody>
            </Table>
        </Container>       
    )
}