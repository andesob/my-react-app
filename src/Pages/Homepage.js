import React, { Component } from 'react';
import '../Styles/homepage.css';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catUrl: '',
            isLoading: true
        };

        this.getNewCat = this.getNewCat.bind(this);
    }

    componentDidMount() {
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
                    catUrl: data[0].url,
                    isLoading: false
                })
            })
    }

    render() {
        if (!this.state.isLoading) {
            console.log(this.state.books)
            return (
                <div className='main-wrapper'>
                    <div className='wrapper'>
                        <img className='catImg' src={this.state.catUrl} alt='fordi jeg må'></img>

                        <button className='newCatBtn' onClick={this.getNewCat}>New cat</button>
                    </div>
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