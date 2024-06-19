import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../src/components/Header';

describe('<Header />', () => {
  it('renders the header', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Meu Fórum')).to.exist;
  });
});
