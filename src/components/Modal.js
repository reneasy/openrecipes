import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import './Modal.css';

class Modal extends Component {
	render(){
		const { show, handleClose, children } = this.props;

		const showHideClassName = show ? "modal modal-open" : "modal modal-close";

		return (
			<div className={showHideClassName}>
				<section className="modal-main">
					<span className="modal-close-icon"
						onClick={handleClose}>
						<FontAwesomeIcon icon={faTimesCircle} />
					</span>
					{children}
				</section>
			</div>
		);
	}
}

Modal.propTypes = {
	show: PropTypes.string.isRequired,
	handleClose: PropTypes.func.isRequired,
	children: PropTypes.string.isRequired,
}

export default Modal;
