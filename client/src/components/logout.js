import React, { Component } from "react";
import Axios from "axios";
import '../App.css';
import Cookies from 'universal-cookie';
import Nav from './nav.js'


const cookies = new Cookies();
	

class Logout extends Component {

	state = {
		gifs: [],
		pick: ""
	};

	componentDidMount() {
		var key = "api_key=IelN2EsP53lCGIzF6kjIakIkgXbSa3bL"
		Axios.get("https://api.giphy.com/v1/gifs/search?q=crying&limit=20&offset=0&rating=G&lang=en&"+key)
			.then((data) => {

				cookies.remove('name');
				cookies.remove('id');

				var datas = [];

				data.data.data.forEach(i => { datas.push(i.images.downsized_large.url)})
				this.setState({ gifs: datas });
				this.pickGif()
			});
	}

	pickGif = () => {
		if (this.state.gifs !== []){
			let num = Math.floor(Math.random()*(this.state.gifs).length);
			this.setState({ pick: this.state.gifs[num]})
		}
	}

	render() {

		return (
			<div>
			<Nav/>
			<div className = "wrapper">
				
				<div className="row">
					<div className="logoutPanel col s12 top z-depth-2">
						<h2 className="logoutText center">Why do you have to leave? Everyone always leaves...</h2>
					</div>
				</div>
				<div className ="row">
					<div className="col s12">
						<div className = "panel-list center-align">
							<img alt='img' src ={this.state.pick}/>
						</div>
					</div>
				</div>
				
			</div>
				</div>
		);
	};
};


export default Logout;