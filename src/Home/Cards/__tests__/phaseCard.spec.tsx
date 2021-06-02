
import React from 'react';
import {create} from 'react-test-renderer';
import PhaseCard from '../PhaseCard';

const tree = create(<PhaseCard/>)
test('renders correctly', () => { 
    expect(tree).toMatchSnapshot();
  });