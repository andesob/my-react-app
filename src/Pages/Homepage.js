import React, { Component } from 'react';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        fetch('https://the-one-api.dev/v2/book')
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({
                    books: data.docs,
                    isLoading: false
                })
            })

    }

    render() {
        if (!this.state.isLoading) {
            console.log(this.state.books)
            return (
                <div>
                    {this.state.books.map(book => <div key={book._id}> {book.name} </div>)} 
                </div>
            );
        } else{
            return(
                <div>
                    Loading information
                </div>
            )
        }

    }
}

export default Header;