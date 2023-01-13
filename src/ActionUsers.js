import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {Container, Form, FormGroup, Label, Input, Button} from "reactstrap";

// If "id" is supplied, then this component will act as edit-user page
// If "id" is not supplied, then this component will act as create-user page 


export default function ActionUsers(){
    // The mock-API url used
    const url = "https://639ac1bf31877e43d6751029.mockapi.io/usersPage/";

    // Initialising empty data for the fields which are required to be shown in the users page
    const emptyFormData = {
        username:'',
        name:'',
        email:'',
        address:''
    }
    const navigate = useNavigate();

    // Initialising state for formData
    const [formData, setFormData] = useState(emptyFormData);

    // Getting the "id" of user (if the action is for edit-user)
    const {id} = useParams();

    // Function to bring single user details (when it is "edit-user" page)
    const getUserDetails = async () => {
        let userData = await fetch(url+id).then(dat=>dat.json()).then(res=>setFormData(res));
    }

    // Using useEffect to execute "getUserDetails" function whenever state changes
    useEffect(()=>{
        if(id){
            getUserDetails();
        }
    },[])

    // "handleChange" function is to apply the changes made in the form fiels to the "formData"
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    // "handleSubmit" function is for submitting the data to the mock-API and will navigate to users page
    const handleSubmit = async () => {
        if(id){
            let putData = await fetch(url+id,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            }).then(dat=>navigate('/users'));
        }else{
            let postData = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            }).then(dat=>navigate('/users'))
        }
    }


    // Data to be shown on the "create-user" or "edit-user" web page
    return(
        <Container style={{marginTop:"20px", marginBottom:"100px"}}>
            {
            id? (<h6>Edit-user page</h6>) : (<h6>Create-user page</h6>)
            }
            <br />

            <Form>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input placeholder="Username" name="username" value={formData.username} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input placeholder="Name" name="name" value={formData.name} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input placeholder="Email" name="email" value={formData.email} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input placeholder="Address" name="address" value={formData.address} onChange={handleChange}/>
                </FormGroup>
            </Form>
            <br />

            {/* Button to cancel the creation or modification of user */}
            {
            id?(<Button color="warning" style={{marginRight:"20px"}} onClick={()=>navigate('/users')}>Cancel</Button>):(<Button color="warning" style={{marginRight:"20px"}} onClick={()=>navigate('/')}>Cancel</Button>)
            }

            {/* Button to submit the new user data or modified data of existing user to the mock-API */}
            <Button color="success" style={{marginLeft:"20px"}} onClick={handleSubmit}>Submit</Button>
        </Container>
        
    )
}