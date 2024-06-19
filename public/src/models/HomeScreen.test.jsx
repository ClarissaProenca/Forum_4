import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomeScreen from '../src/screens/HomeScreen';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<HomeScreen />', () => {
  it('renders HomeScreen component', () => {
    const { getByText } = render(
      <Router>
        <HomeScreen />
      </Router>
    );
    expect(getByText('Meu Fórum')).to.exist;
    expect(getByText('Ver Posts')).to.exist;
    expect(getByText('Novo Post')).to.exist;
    expect(getByText('Login')).to.exist;
  });
});
