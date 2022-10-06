import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import rendered from 'react-test-renderer';
import UploadFile from '../UploadFile/UploadFile';

const fileReaderId = 'fileReader';

const setup = () => {
  render(<UploadFile />);
  const fileReader = screen.getByTestId(fileReaderId);
  return fileReader;
}

afterEach(() => {
  cleanup();
});

test('Should render UploadFile component', () => {
  render(<UploadFile />);
  const fileReaderElement = screen.getByTestId('fileReader');
  expect(fileReaderElement).toBeInTheDocument();
});

test('Input type of <input> should be file', () => {
  const fileReader = setup();
  expect(fileReader).toBeInTheDocument();
  expect(fileReader).toHaveAttribute("type", "file");
});

test('Matches snapshot', () => {
  const tree = rendered.create(<UploadFile />).toJSON();
  expect(tree).toMatchSnapshot();
});
