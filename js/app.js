import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import './../sass/main.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import StartPage from './StartPage/StartPage';
import AllRestaurantsPage from './AllRestaurantsPage/AllRestaurantsPage';
import OneRestaurantPage from './OneRestaurantPage/OneRestaurantPage';
import RestaurantsData from './API/RestaurantsData.json';

class App extends Component {

    state = {
        data: null,
        address: ''
    }

    componentDidMount() {
        this.setState({
            data: RestaurantsData
        })
    }

    handleAddress = address => {
        const addressTxt = `${address.street}, ${address.zipCode} ${address.city}`;

        this.setState({
            address: addressTxt
        })
    }

    render() {
        const { data } = this.state;
        if (!data) return null;

        return (
            <BrowserRouter>
                <Header address={this.state.address} />
                <Switch>
                    <Route exact path={"/"} component={() => <StartPage data={data} handleAddress={this.handleAddress} />} />
                    <Route exact path={"/restaurants"} component={() => <AllRestaurantsPage data={data} />} />
                    <Route exact path={"/restaurants/:id"} render={(props) => <OneRestaurantPage data={data} {...props} />} />
                </Switch>
                <Footer />
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));












