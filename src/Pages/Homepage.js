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
        this.clearStorage = this.clearStorage.bind(this);
        this.setItem = this.setItem.bind(this);
        this.goToLikedCats = this.goToLikedCats.bind(this);
    }

    componentDidMount() {
        var likedCats = JSON.parse(localStorage.getItem('LikedCats'));
        if (likedCats) {
            var cats = likedCats.map(cat => ({
                id: cat.id,
                url: cat.url
            }))

            this.setState({
                likedCats: cats
            })
        }
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
            })
    }

    dislikeCat() {
        var newList = this.state.dislikedCats.concat(this.state.cat);
        this.setState({
            dislikedCats: newList
        })
        this.getNewCat();
    }

    setItem() {
        console.log(this.state.likedCats);
        this.getNewCat();
        localStorage.setItem('LikedCats', JSON.stringify(this.state.likedCats));
    }

    likeCat() {
        var newList = this.state.likedCats.concat(this.state.cat);
        this.setState({
            likedCats: newList
        },
            this.setItem)
    }

    clearStorage() {
        localStorage.clear();
    }

    goToLikedCats() {
        return (
            <Link className='likedCatsLink' to={{
                pathname: '/likedcats',
                likedCats: this.state.likedCats
            }}>Liked Cats</Link>
        )
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <div className='main-wrapper'>
                    <div className='homepage-wrapper'>
                        {this.state.cat.map(cat => <img key={cat.id} className='catImg' src={cat.url} alt='fordi jeg må'></img>)}
                    <div>
                        <button className='dislikeCatBtn' onClick={this.dislikeCat}>Dislike cat</button>
                        <button className='likeCatBtn' onClick={this.likeCat}>Like cat</button>
                    </div>
                    </div>
                    <div className='button-wrapper'>
                        <ul>
                            <li>
                                <Link className='likedCatsLink' to={{
                                    pathname: '/likedcats',
                                    likedCats: this.state.likedCats
                                }}>Liked Cats</Link>
                            </li>
                            <li>
                                <button className='deleteButton' onClick={this.clearStorage}>Remove all pictures</button>
                            </li>
                        </ul>
                    </div>
                </div >
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