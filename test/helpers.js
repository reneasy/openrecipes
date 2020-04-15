import { expect } from 'chai';
import sinon from 'sinon';
import fetch from 'isomorphic-fetch';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.expect = expect;
global.sinon = sinon;
global.fetch = fetch;

global.mount = mount;
global.render = render;
global.shallow = shallow;
