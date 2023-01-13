import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Label, Input} from 'reactstrap';

export default function EditProfile(){
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
        let userData = await fetch(url+id).then(dat=>dat.json()).then(res=>setFormData(res));
    }

    // Handling the state changes
    useEffect(()=>{
        getUserDetails();
    },[])

    // "handleChange" function is to apply the changes made in the form fiels to the "formData"
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    // "handleUpdate" function is for updating the data to the mock-API and will navigate to profile page
    const handleUpdate = async () => {
        let updateData = await fetch(url+id, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        }).then(dat=>navigate('/profile/'+id));
    }

    // Data that will be shown on the "edit-profile" web-page
    return(
        <Container style={{marginTop:"20px", marginBottom:"100px"}}>
            <h6>Edit-profile page</h6>
            <br />
            <br />
            <Form style={{marginBottom:"50px"}}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input name="name" placeholder='Name' value={formData.name} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input name="address" placeholder='Address' value={formData.address} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="qualification">Qualification</Label>
                    <Input name="qualification" placeholder='Qualification' value={formData.qualification} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="work">Work</Label>
                    <Input name="work" placeholder='Work' value={formData.work} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="fields_of_interest">Fields of interest</Label>
                    <Input name="fields_of_interest" placeholder='Fields of interest' value={formData.fields_of_interest} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="personal_details">Personal details</Label>
                    <Input name="personal_details" placeholder='Personal details' value={formData.personal_details} onChange={handleChange} />
                </FormGroup>
            </Form>

            {/* Button to cancel updating the profile of user */}
            <Button color="warning" style={{marginRight:"10px"}} onClick={()=>navigate('/profile/'+id)}>Cancel</Button>

            {/* Button for updating the new data of profile to the mock-API */}
            <Button color="primary" style={{marginLeft:"10px"}} onClick={handleUpdate}>Update</Button>
        </Container>
    )
}