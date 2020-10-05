import React from 'react';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

export default class Bookmark extends React.Component {
    state = {
        data: []
    };

    componentDidMount() {
        this.getBookmarkedQuotes();
    }

    getBookmarkedQuotes = async () => {
        await axios.get('/api/get').then(response => {
            this.setState({data: response.data});
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }


    render() {
        if (!this.state.data) return [];
        const quotes = this.state.data.map((item) =>
            <Card style={{ 'minWidth': 200, 'marginBottom': '20px' }} variant="outlined" key={item.id}>
                <CardContent>
                    <Typography variant="h6" component="h2">
                        {item.quote}
                    </Typography>
                    <Typography style={{ 'fontSize': 14 }} color="textSecondary" gutterBottom>
                        {item.author}
                    </Typography>
                </CardContent>
            </Card>
        );
        return (
            <List>
                {quotes}
            </List>

        )
    }
}
