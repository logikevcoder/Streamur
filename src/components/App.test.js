import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router';
import App from './App.js';

it('renders correct routes', () => {
  const wrapper = shallow(<App />);

  const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
    const routeProps = route.props();
    pathMap[routeProps.path] = routeProps.component;
    return pathMap;
  }, {});

  expect(pathMap['/']).toBe(App.PageOne);
  expect(pathMap['/pagetwo']).toBe(App.PageTwo);
});
