import React, { Component } from "react";
import "./Post.css";
import UserModal from "../../components/Modals/Users";
import CommentModal from "../../components/Modals/Comments";
import Moment from 'react-moment';
import axios from "axios";
class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            userModalShow: false,
            commentModalShow: false,
            userData: [],
            commentsData: [],
            userLocation: [],
            postComments: []
        }
    }
    getUserProfile(){
        axios.get(`https://dummyapi.io/data/api/user/`+this.props.dataPost.owner.id, {
            headers: {
                'app-id': process.env.REACT_APP_API_KEY
            }
        }).then(res => {
           this.setState({userData: res.data})
           this.setState({userLocation: res.data.location})
            this.setState({userModalShow: true})
           console.log(res.data);
        })
    }
    getComments(postId){
        axios.get(`https://dummyapi.io/data/api/post/`+postId+`/comment?limit=10`, {
            headers: {
                'app-id': process.env.REACT_APP_API_KEY
            }
        }).then(res => {
            this.setState({commentsData: res.data.data})
            this.setState({commentModalShow: true})
            console.log(this.state.commentsData);
        })
    }
    filterByTag(tag){
        this.props.filterByTag(tag)
    }
    closeModalUser(){
        this.setState({userModalShow: false});
    }
    closeModalComments(){
        this.setState({commentModalShow: false});
    }
    render() {
        return <article className="Post">
            <UserModal showModal={this.state.userModalShow} userData={this.state.userData} userLocation={this.state.userLocation} onCloseModalUser={this.closeModalUser.bind(this)}/>
            <CommentModal showModal={this.state.commentModalShow} commentsData={this.state.commentsData} onCloseModalComments={this.closeModalComments.bind(this)}/>
                <header>
                    <div className="Post-user" onClick={this.getUserProfile.bind(this)}>
                            <div className="Post-user-avatar">
                                <img alt={this.props.dataPost.owner.picture} src={this.props.dataPost.owner.picture}/>
                            </div>
                            <div className="Post-user-nickname">
                                <span>{this.props.dataPost.owner.firstName} {this.props.dataPost.owner.lastName}</span>
                            </div>
                    </div>
                </header>
                <div className="Post-image">
                    <div className="Post-image-bg">
                        <img alt={this.props.dataPost.image} src={this.props.dataPost.image} />
                    </div>
                </div>
                <div className="Post-caption">
                    {this.props.dataPost.text}
                    <div className="text-truncate">
                        <a className="out-a" target="_blank" rel="noopener noreferrer external nofollow" href={this.props.dataPost.link}>{this.props.dataPost.link}</a>
                    </div>
                </div>
                <div className="Post-caption">
                    <div className="d-flex my-2 mx-n1">
                        { this.props.dataPost.tags.map((tag, id) => <div  key={id} onClick={() => this.filterByTag(tag)} className="Tag-post ml-3">#{tag}</div>)}
                    </div>
                </div>
                <div className="Post-caption">
                    <div className="d-flex justify-content-between border-top pt-2 mt-2">
                        <div>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart"
                                 className="svg-inline--fa fa-heart fa-w-8 mr-1" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" color="#3c4cad">
                                <path fill="currentColor"
                                      d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                            </svg>
                            {this.props.dataPost.likes} Likes
                        </div>
                        <div className="text-muted text-right">
                            <Moment format="MMM DD YYYY hh:mm:ss">
                                {this.props.dataPost.publishDate}
                            </Moment>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between border-top pt-2 mt-2">
                            <span className="Tag-post" onClick={() => this.getComments(this.props.dataPost.id)}>
                                view comments
                            </span>
                    </div>
                </div>
             </article>
    }
}
export default Post;
