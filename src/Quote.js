import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

export default class Qoutable extends React.Component {
    state = {
        data: null,
        bookmark: false
    };

    componentDidMount() {
        this.getNewQuote();
    }
    getNewQuote = async () => {
        try {
            const response = await fetch("https://api.quotable.io/random");
            const data = await response.json();
            if (!response.ok) throw new Error(data);
            this.setState({ data: data, bookmark: false});
        } catch (error) {
            console.error(error);
            this.setState({ data: { content: "Opps... Something went wrong" } });
        }
    };

    bookmarkQuote = async event => {
        event.preventDefault();
        this.setState({ bookmark: true })
        await axios.post('/api/set', {
            quote: this.state.data.content,
            author: this.state.data.author
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        if (!this.state.data) return null;
        return (
            <div>
                <Card style={{ 'minWidth': 275 }} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {this.state.data.content}
                        </Typography>
                        <Typography style={{ 'fontSize': 14 }} color="textSecondary" gutterBottom>
                            {this.state.data.author}
                        </Typography>
                    </CardContent>
                    <CardActions style={{ 'alignItems': 'center', 'justifyContent': 'center' }}>
                        <Button variant='contained' color='primary' size="small" onClick={this.getNewQuote}>New Quote</Button>
                        {this.state.data.author ?
                            this.state.bookmark ?
                                <Button variant='contained' color='primary' size="small" disabled >Bookmarked</Button>
                                : <Button variant='contained' color='primary' size="small" onClick={this.bookmarkQuote}>Bookmark</Button>
                            : null
                        }

                    </CardActions>
                </Card>
            </div>
        )
    }
}
