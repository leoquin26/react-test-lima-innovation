import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Post from './components/Post';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Ellipsis} from 'react-spinners-css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
require('dotenv').config()
class App extends Component {
    state = {
        posts: [],
        counterLimit: 5,
        filterTag: false,
        pageLimit: 5,
        tagTemp: ""
    }
    componentWillMount(){
        this.getPost();
    }
    resetValue(val){
        if(val){
            this.getPost();
        }
    }
    getPost(){
        axios.get(`https://dummyapi.io/data/api/post?limit=`+this.state.pageLimit, {
            headers: {
                'app-id': process.env.REACT_APP_API_KEY
            }
        }).then(res => {
            const posts = res.data.data;
            this.setState({ posts: posts });
        })
    }
    getPostByTags(val){
        this.setState({tagTemp: val})
        axios.get(`https://dummyapi.io/data/api/tag/`+val+`/post?limit=`+this.state.pageLimit, {
            headers: {
                'app-id': process.env.REACT_APP_API_KEY
            }
        }).then(res => {
            const posts = res.data.data;
            this.setState({ posts: posts });
            this.setState({filterTag: true});
        })
    }
    handleChange = event => {
        let counterLimit = this.state.counterLimit;
        counterLimit +=5;
        setTimeout(() => {
            this.setState({pageLimit: counterLimit})
            this.setState({counterLimit: counterLimit});
            if(!this.state.filterTag){
                this.getPost();
            }else{
                this.getPostByTags(this.state.tagTemp)
            }
        }, 1500);
    };

    render() {
        return <div className="App">
            <Header initValue={this.resetValue.bind(this)} />
            <InfiniteScroll
                dataLength={this.state.posts.length}
                next={this.handleChange}
                hasMore={true}
                loader={<Ellipsis/>}
            >
            <section className="App-main">
                { this.state.posts.map((post, i) => <Post key={i} dataPost={post}  filterByTag={this.getPostByTags.bind(this)}/>)}
            </section>
            </InfiniteScroll>
        </div>;
    }
}
export default App;
