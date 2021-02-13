import React ,{Component} from 'react' ;
import {Card , CardImg  , CardText, CardBody , CardTitle ,Breadcrumb ,BreadcrumbItem , Button ,
    Modal ,ModalHeader ,ModalBody,Col ,Row ,Label} from 'reactstrap';
import {Control , LocalForm , Errors} from 'react-redux-form'
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent'
import {baseUrl} from '../shared/baseUrl'
import { FadeTransform , Fade ,Stagger} from "react-animation-components";
    function RenderDish ({dish}) 
        {
            console.log(dish);
            console.log(dish.image);
            return(
                <div className = "col-12 col-md-5 m-1">
                    <FadeTransform in   
                        transformProps = {{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                        <Card>
                            <CardImg top src = {baseUrl + dish.image} alt = {dish.name}/>
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>   
                        </Card>
                    </FadeTransform>
                </div>
            )
            
        }

    function RenderComments({comments ,postComment , dishId}) {

        const coments = comments.map((comment) => {
           return(
               <Fade in >
                    <li key = {comment.id}>
                        <p>{comment.comment}</p>
                        <p>--{comment.author} ,
                            &nbsp;
                            {new Intl.DateTimeFormat('en-US' , {
                                year: 'numeric',
                                month:'long',
                                day :'2-digit'
                            }).format(new Date(comment.date))}
                        </p>
                    </li>
                </Fade>
           ) 
        }) 

        return(
            <div className = "col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className = 'list-unstyled'>
                <Stagger in>
                    {coments}
               </Stagger>

                </ul>
                <CommentForm dishId={dishId} postComment={postComment}>

                </CommentForm>
            </div>
        )
        
    }
    const DishDetail = (props) => {
        if(props.isLoading){
            return (
                <div className = "container">                
                    <div className = "row">  
                        <Loading/>
                    </div>    
                </div>

            )
        }
        else if (props.errMess) {
            return (
                <div className = "container">                
                    <div className = "row">  
                        <h4>{props.errMess}</h4>
                    </div>    
                </div>

            )
        }
        const coments = props.comments
        const dishh = props.dish
        if(dishh == null) {
            return(<div></div>)
        }
        //const dishItem = this.renderDish(dishh)
        //const dishComment = this.renderComments(dishh.comments)

        return (
            <div className = "container">
                <div className = "row">
                    <Breadcrumb>   
                        <BreadcrumbItem><Link to ='/menu'>Menu</Link></BreadcrumbItem>    
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className = "col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className = "row">
                        <RenderDish dish = {dishh} />
                        <RenderComments comments = {coments} 
                            postComment = {props.postComment}
                            dishId = {props.dish.id}/>
                </div>
            </div>
        )
     
    }

    const minLength = (len) => (val) => val && (val.length >= len);
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
   
    class CommentForm extends Component {

        constructor(props){
            super(props)
            this.state = {
                isModalOpen : false
            };  
        this.toggleModal =this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }
        toggleModal() {
            this.setState ( {
                isModalOpen : !this.state.isModalOpen
            })
        }
        handleSubmit(values) {
            this.toggleModal()
            console.log("current state is" + JSON.stringify(values))
            alert("Current State is: " + JSON.stringify(values))
            console.log(values)
            //console.log("current state is" + JSON.stringify(values))
            //alert("Current State is: " + JSON.stringify(values))
            this.props.postComment(this.props.dishId , values.rating ,values.author ,values.comment);
        }
        render()
        {
            return(
                <React.Fragment>
                    <Button outline onClick = {this.toggleModal} >
                        <span className = "fa fa-pencil fa-lg"></span>Submit Comment
                    </Button>

                    <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>
                        <ModalHeader toggle = {this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control">
                                            <option></option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>   
                                            <option>4</option>   
                                            <option>5</option>   
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators = {{
                                                minLength : minLength(3) , maxLength :maxLength(15) ,
                                               
                                            }}
                                        />
                                        <Errors
                                            className = "text-danger"
                                            model = ".author"
                                            show = "touched"
                                            messages = {{
                                            minLength : 'Must be greater than 2 Characters' ,
                                            maxLength : 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="6"
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col >
                                        <Button  type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm> 
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            )
        }
    }
export default DishDetail;