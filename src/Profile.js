import {useState, useEffect} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {Container, Form, FormGroup, Label, Input, Button} from 'reactstrap';

export default function Profile(){
    // The mock-API url used
    const url = "https://639ac1bf31877e43d6751029.mockapi.io/usersPage/";

    // Initialising empty data for the input fields required for the profile of a user
    const emptyFormData = {
        username:'',
        name:'',
        email:'',
        address:'',
        personal_details: "",
        qualification: "",
        work: "",
        fields_of_interest: "",
    }

    // Getting the "id" of user
    const {id} = useParams();
    const navigate = useNavigate();

    // Initialising state for "formData"
    const [formData, setFormData] = useState(emptyFormData);

    // Function to fetch the details of that particular user
    const getUserDetails = async () => {
        let getData = await fetch(url+id).then(dat=>dat.json()).then(res=>setFormData(res));
    }

    // Handling the state changes
    useEffect(()=>{
        getUserDetails();
    },[]);


    // Data to be shown on the web-page
    return(
        <Container style={{marginTop:"20px", marginBottom:"100px"}}>
            <h6>Profile page</h6>
            <br />

            {/* Button to navigate back to the users page */}
            <Button color="primary" onClick={()=>navigate("/users")} style={{marginRight:"10px"}}>Back to users page</Button>

            {/* Button to edit the profile of that user */}
            <Button color="warning" onClick={()=>navigate("/edit-profile/"+id)} style={{marginLeft:"10px"}}>Edit profile</Button>
            <br />
            <br />

            <Form>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input name="username" value={formData.username} disabled="true"/>
                </FormGroup>

                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input name="name" value={formData.name} disabled="true"/>
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input name="email" value={formData.email} disabled="true"/>
                </FormGroup>

                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input name="address" value={formData.address} disabled="true"/>
                </FormGroup>

                <FormGroup>
                    <Label for="qualification">Qualification</Label>
                    <Input name="qualification" value={formData.qualification} disabled="true"/>
                </FormGroup>

                <FormGroup>
                    <Label for="work">Work</Label>
                    <Input name="work" value={formData.work} disabled="true"/>
                </FormGroup>

                <FormGroup>
                    <Label for="fields_of_interest">Fields of interest</Label>
                    <Input name="fields_of_interest" value={formData.fields_of_interest} disabled="true"/>
                </FormGroup>

                <FormGroup>
                    <Label for="personal_details">Personal details</Label>
                    <Input name="personal_details" value={formData.personal_details} disabled="true"/>
                </FormGroup>
            </Form>

        </Container>
        
    )
}