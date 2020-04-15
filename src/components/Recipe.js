import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

import Modal from './Modal.js';

import './Recipe.css';
import tmpThumbnail from '../images/thumbnail.png';


class Recipe extends Component {
	constructor(props) {
		super(props);		

		this.state = {
			isModalVisible: false
		};

		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

	componentWillUnmount() {
		this.setState({isModalVisible: false})
	}

	showModal() {
		this.setState({ isModalVisible: true });
	}

	hideModal() {
		this.setState({ isModalVisible: false });
	}

	render() {
		const { thumbnail, title, href, ingredients, keyIndex } = this.props

		return (
			<li key={keyIndex}
				className="Recipe-item">
				<div className="Recipe-basic-info">
					<img src={thumbnail || tmpThumbnail} 
						className="Recipe-thumbnail" 
						alt="thumbnail" />
					<div>
						<p className="Recipe-name" dangerouslySetInnerHTML={{__html: title}}></p>
						<button className={`Recipe-expand ${this.state.isModalVisible ? 'active' : ''}`}
							onClick={this.showModal}>
								Ingredients
						</button>
						<button className="Recipe-link"
							onClick={()=> window.open(href, "_blank")}>
								<FontAwesomeIcon icon={faShare} />							
						</button>
					</div>
				</div>
				<Modal show={this.state.isModalVisible} handleClose={this.hideModal}>
					<div className="Recipe-details">
						<div>
							<p className="Recipe-ingredients-label">Ingredients</p>
							<p className="Recipe-ingredients">{ingredients || "No Ingredients Found"}</p>
						</div>						
					</div>
				</Modal>
			</li>
		);
	}
}

 
Recipe.propTypes = {
	thumbnail: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
	ingredients: PropTypes.string.isRequired,
	keyIndex: PropTypes.number.isRequired,
}

export default Recipe;
