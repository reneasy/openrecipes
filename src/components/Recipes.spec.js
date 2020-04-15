import React from 'react';
import Recipes from './Recipes.js';

const recipes = require('../../data/recipes.json');

describe('Recipes Component', () => {
	beforeEach(() => {
		const mockResponse = {
			status: () => {},
			json: () => {
				return recipes;
			}
		};

		sinon.stub(global, 'fetch').returns(Promise.resolve(mockResponse));
	});

	afterEach(() => {
		global.fetch.restore();
	});

	it('Renders the header section', () => {
		const wrapper = shallow(<Recipes />);

		expect(wrapper.find("header.Recipes-header").length).to.equal(1);
	});

	it('Renders the recipes search form', () => {
		const wrapper = shallow(<Recipes />);

		expect(wrapper.find("form.Recipes-search").length).to.equal(1);
	});

	it('Renders the recipes count section', () => {
		const wrapper = shallow(<Recipes />);

		expect(wrapper.find(".Recipes-count").length).to.equal(1);
	});

	it('Renders the recipes list section', () => {
		const wrapper = shallow(<Recipes />);

		expect(wrapper.find(".Recipes-list").length).to.equal(1);
	});

	it('Renders the footer section', () => {
		const wrapper = shallow(<Recipes />);

		expect(wrapper.find("footer.Recipes-footer").length).to.equal(1);
	});

	describe('componentDidMount', () => {
		it('should call componentDidMount', () => {
			sinon.spy(Recipes.prototype, 'componentDidMount');

			// eslint-disable-next-line no-unused-vars
			const wrapper = mount(<Recipes />);
			expect(Recipes.prototype.componentDidMount.calledOnce).to.equal(true);			
		});

		it('should call fetch on componentDidMount', () => {
			// eslint-disable-next-line no-unused-vars
			const wrapper = mount(<Recipes />);

			expect(global.fetch.calledOnce).to.equal(true);			
		});
	});

	describe('handleChange', () => {
		it('should fetch recipe data onChange', () => {
			sinon.spy(Recipes.prototype, 'handleChange');
			const wrapper = mount(<Recipes />);

			wrapper.find('input').simulate('change', {target: {value: 'Your new Value'}});

			expect(Recipes.prototype.handleChange.calledOnce).to.equal(true);		
			expect(global.fetch.calledOnce).to.equal(true);			
		});
	});

	describe('getRecipes', () => {
		it('should call getRecipes on render', () => {
			sinon.spy(Recipes.prototype, 'getRecipes');

			// eslint-disable-next-line no-unused-vars
			const wrapper = mount(<Recipes />);

			expect(Recipes.prototype.getRecipes.calledOnce).to.equal(true);			
		});
	});

	describe('getRecipesLength', () => {
		xit('should return the total number of recipes', () => {
			sinon.spy(Recipes.prototype, 'getRecipesLength');

			const wrapper = mount(<Recipes />);
			// Todo: state won't persist
			wrapper.forceUpdate();

			expect(Recipes.prototype.getRecipesLength.calledOnce).to.equal(true);			
			expect(wrapper.instance().getRecipesLength()).to.equal(5);			
		});
	});
});
