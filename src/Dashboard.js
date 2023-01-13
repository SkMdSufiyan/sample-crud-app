import {useNavigate, useParams} from "react-router-dom";
import {Container, Button} from "reactstrap";

export default function Dashboard(){
    const navigate=useNavigate();
    return(
        <Container style={{marginTop:"20px"}}>
            <br />
            <h6>Dashboard</h6>
            {/* Button for creating a new user */}
            <Button color="success" style={{marginRight:"50px", marginTop:"30px"}} onClick={()=>navigate("/create-user")}>Create User</Button>

            {/* Button for going to users page */}
            <Button color="primary" style={{marginLeft:"50px", marginTop:"30px"}} onClick={()=>navigate("/users")}>Users List</Button>
        </Container>

    )
}