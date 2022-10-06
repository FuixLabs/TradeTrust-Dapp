import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import rendered from 'react-test-renderer';
import App from "../App";

const containerTestId = 'containerId';

const setup = () => {
  render(<App />);
  const appContainer = screen.getByTestId(containerTestId);
  return appContainer;
}

afterEach(() => {
  cleanup();
});

test('Should render App component', () => {
  const appContainer = setup();
  expect(appContainer).toBeInTheDocument();
});

test('Matches snapshot', () => {
  const tree = rendered.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
})