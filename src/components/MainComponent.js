import { Component } from 'react';
import Home from './HomeComponent' ;
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent'
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import {Switch ,Route , Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {postComment ,fetchComments,fetchDishes, fetchPromos ,fetchLeads, postFeedback} from '../redux/ActionCreators'
import {actions} from 'react-redux-form'
import  {TransitionGroup ,CSSTransition} from 'react-transition-group'


const mapStateToProps = state => {
    return {
      dishes: state.dishes ,
      comments: state.comments ,
      promotions: state.promotions ,
      leaders : state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating ,author ,comment) => dispatch(postComment(dishId, rating ,author ,comment)), //this func call where we're calling action creator will return action object for adding a comment
  //that action object is given as a parameter to the dispatch function here. So the dispatch function obtains that as a parameter, and that we are supplying as a function here, and this can be used within our component here. 
  fetchDishes: () => {dispatch(fetchDishes())}, //The call, this is a thunk, and so we can dispatch that thunk by using dispatch and in order to do the dispatch, I need to map it in the DispatchToProp so that dispatch dishes becomes available for my main component to make use of. So, in the main component I need to fetch the dishes.
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}, //modal will be called feedback
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeads: () => {dispatch(fetchLeads())} ,
  postFeedback : (firstname ,lastname,telnum , email , agree , contactType ,message) => dispatch(postFeedback(firstname ,lastname,telnum , email , agree , contactType ,message))

});

 
class Main extends Component {

/*  constructor(props){
    super(props)
    
  } */

  //Lifecycle method
  //So this will ensure that when my mainComponent is mounted, then I'll go and fetch all these from that server. 
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeads();
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish ={this.props.dishes.dishes.filter((dish) => dish.featured)[0] }
        dishesLoading = {this.props.dishes.isLoading}
        dishesErrMess = {this.props.dishes.errMess}
        promotion ={this.props.promotions.promotions.filter((promo) => promo.featured)[0] }
        promosLoading = {this.props.promotions.isLoading}
        promosErrMess = {this.props.promotions.errMess}
        leader ={this.props.leaders.leaders.filter((lead) => lead.featured)[0] }
        leadsLoading = {this.props.leaders.isLoading}
        leadsErrMess = {this.props.leaders.errMess}
        />
      )
    }

    const DishWithId = ({match}) => {
      return (
        <DishDetail dish ={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId ,10))[0]} //converting it into base 10 integer
          isLoading = {this.props.dishes.isLoading}
          errMess = {this.props.dishes.errMess}
          comments = {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId ,10))}
          commentsErrMess = {this.props.comments.errMess}
          postComment = {this.props.postComment}
        />  
      )
    }

    return (
      <div>
          <Header />
          <TransitionGroup>
            <CSSTransition key = {this.props.location.key} classNames = "page" timeout = {300}>
              <Switch>
                <Route path = "/home" component = {HomePage} />
                <Route exact path = "/contactus" component = {() => <Contact resetFeedbackForm = {this.props.resetFeedbackForm} postFeedback = {this.props.postFeedback} />} />
                <Route path = "/menu/:dishId" component = {DishWithId} />
                <Route  path = "/aboutus" component = {() => <About leaders = {this.props.leaders}  leadsLoading = {this.props.leaders.isLoading}
                                                                    leadsErrMess = {this.props.leaders.errMess}
                                                                    />}
                 />
                <Route exact path = "/menu" component = {() => <Menu dishes = {this.props.dishes}/>} />
                <Redirect to = "/home"/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps ,mapDispatchToProps)(Main));
