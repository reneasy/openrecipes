import React from 'react';
import Recipe from './Recipe.js';

describe('Recipe Component', () => {
	it('Renders the recipe list item', () => {
		const wrapper = shallow(<Recipe />);

		expect(wrapper.find(".Recipe-item").length).to.equal(1);
	});

	it('Renders the recipe avatar image', () => {
		const wrapper = shallow(<Recipe />);

		expect(wrapper.find("img.Recipe-thumbnail").length).to.equal(1);
	});

	it('Renders the recipe basic info section', () => {
		const wrapper = shallow(<Recipe />);

		expect(wrapper.find(".Recipe-basic-info").length).to.equal(1);
	});

	describe('handleClick', () => {
		it('should not render the recipe details section', () => {
			const wrapper = mount(<Recipe />);

			expect(wrapper.find(".modal.modal-open").length).to.equal(0);
		});

		it('should toggle recipe details on click', () => {
			sinon.spy(Recipe.prototype, 'showModal');
			const wrapper = mount(<Recipe />);

			wrapper.find('.Recipe-expand').simulate('click');

			expect(Recipe.prototype.showModal.calledOnce).to.equal(true);
			expect(wrapper.find(".modal.modal-open").length).to.equal(1);
		});
	});
});
