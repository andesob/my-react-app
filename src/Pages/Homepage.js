import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/homepage.css';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            cat: {
                id: "",
                url: ""
            },
            likedCats: [],
            dislikedCats: []
        };

        this.getNewCat = this.getNewCat.bind(this);
        this.dislikeCat = this.dislikeCat.bind(this);
        this.likeCat = this.likeCat.bind(this);
    }

    componentDidMount() {
        var likedCats = JSON.parse(localStorage.getItem('LikedCats'));
        var cats = likedCats.map(cat => ({
            id: cat.id,
            url: cat.url
        }))

        console.log(cats)

        this.setState({
            likedCats: cats
        })
        this.getNewCat();
    }

    getNewCat() {
        this.setState({
            isLoading: true
        })
        fetch('https://api.thecatapi.com/v1/images/search', {
            headers: new Headers({
                'x-api-key': '60e70a58-0b7b-432b-b4e3-ee4a7f61ec99'
            })
        })
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({
                    cat: data.map(cat => ({
                        id: cat.id,
                        url: cat.url
                    })),
                    isLoading: false
                })
                console.log(this.state.likedCats);
                console.log(this.state.dislikedCats);
            })
    }

    dislikeCat() {
        var newList = this.state.dislikedCats.concat(this.state.cat);
        this.setState({
            dislikedCats: newList
        })
        this.getNewCat();
    }

    likeCat() {
        var newList = this.state.likedCats.concat(this.state.cat);
        this.setState({
            likedCats: newList
        })
        this.getNewCat();
        console.log(this.state.likedCats)
        localStorage.setItem('LikedCats', JSON.stringify(this.state.likedCats));
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <div className='main-wrapper'>
                    <div className='wrapper'>
                        {this.state.cat.map(cat => <img className='catImg' src={cat.url} alt='fordi jeg må'></img>)}

                        <button className='dislikeCatBtn' onClick={this.dislikeCat}>Dislike cat</button>
                        <button className='likeCatBtn' onClick={this.likeCat}>Like cat</button>
                    </div>
                    <Link to={{
                        pathname: '/likedcats',
                        likedCats: this.state.likedCats
                    }}>Liked Cats</Link>
                </div>
            );
        } else {
            return (
                <div>
                    Loading information
                </div>
            )
        }

    }
}

export default Homepage;