import React ,{Component} from 'react';
import {Breadcrumb , BreadcrumbItem ,Button,Label ,Input ,Col ,Row } from 'reactstrap'
import {Link} from 'react-router-dom'
import {Control , LocalForm,Form ,actions , Errors} from 'react-redux-form'


const required = (val) => val && val.length; //first function is defined as required, which receives a value as a parameter and then it checks to see that the value is greater than zero
const maxLength = (len) => (val) => !(val) || (val.length <= len); /*So it ensures that the length is less than or equal to the length value that I specify as a parameter here.
 So this is the maximum length. So this enables us to check and make sure that the length of the value entered in the input box is below a certain value.*/
 
 /**
  * const add = (x, y) => x + y
    add(2, 3) //=> 5
    Here it is again in curried form …

    const add = x => y => x + y
    Here is the same1 code without arrow functions …

    const add = function (x) {
    return function (y) {
    return x + y
    }

} */
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail  = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val); //Regular_expression

class Contact extends Component {

    constructor (props)  {
        super(props);

       
        
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleSubmit(values) {
        console.log("current state is" + JSON.stringify(values))
        this.props.resetFeedbackForm();
        this.props.postFeedback(values.firstname ,values.lastname,values.telnum , values.email , values.agree , values.contactType , values.message)        
    }

    render () {
        
        return(
            <div className="container">
                    <div className = "row">
                        <Breadcrumb>   
                            <BreadcrumbItem><Link to ='/home'>Home</Link></BreadcrumbItem>    
                            <BreadcrumbItem active>Contact US</BreadcrumbItem>
                        </Breadcrumb>
                        <div className = "col-12">
                            <h3>Contact Us</h3>
                            <hr/>
                        </div>
                    </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1 ">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className ="row row-content">
                    <div className = "col-12">
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className = "col-12 cold-md-9 mt-5">
{/** earlier used <LocalForm> in place of <Form> for local state */}  
                        <Form model= "feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators = {{
                                            required , minLength: minLength(3) , maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className = "text-danger"
                                        model = ".firstname"
                                        show = "touched"
                                        messages = {{
                                            required : 'Required-' ,
                                            minLength : 'Must be greater than 2 Characters-' ,
                                            maxLength : 'Must be 15 characters or less-'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators = {{
                                            required , minLength: minLength(3) , maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className = "text-danger"
                                        model = ".lastname"
                                        show = "touched"
                                        messages = {{
                                            required : 'Required-' ,
                                            minLength : ' Must be greater than 2 Characters-' ,
                                            maxLength : ' Must be 15 characters or less-'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. Number"
                                        className="form-control"
                                        validators = {{
                                            required , minLength: minLength(3) , maxLength: maxLength(10) , isNumber
                                        }}
                                    />
                                    <Errors
                                        className = "text-danger"
                                        model = ".telnum"
                                        show = "touched"
                                        messages = {{
                                            required : 'Required' ,
                                            minLength : 'Must be greater than 2 numbers-' ,
                                            maxLength : 'Must be 10 number-' ,
                                            isNumber  : 'must be a number-'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control" 
                                        validators = {{
                                            required , validEmail
                                        }}
                                    />
                                    <Errors
                                        className = "text-danger"
                                        model = ".email"
                                        show = "touched"
                                        messages = {{
                                            required : 'Required' ,
                                            validEmail : 'Invalid Email Address'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 5, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className="form-check-input"
                                                 /> {' '}
                                                <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Label htmlFor="rating" md={2}><strong>Contact Type</strong></Label>
                                <Col md={{size: 2, offset: 1}}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>select</option>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact; 