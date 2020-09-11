import React from 'react';
import { render } from '@testing-library/react';
import { ionFireEvent as fireEvent } from '@ionic/react-test-utils';
import App from './App';
import Test,{Todo} from './pages/Test'

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});

test('page should have a title of Tab1', async () => {
  const { findByText } = render(<Test />);
  await findByText('Ionic React Todos');
});

test('when there are no todos, a no todos message should show', async () => {
  const { findByText } = render(<Test />);
  await findByText('No todos, add some!')
});

function mockFetch(data: any) {
  return jest.spyOn(window, 'fetch').mockResolvedValue(new Response(JSON.stringify(data)));
}

beforeEach(() => mockFetch([]));

test('when TodoList is loaded with todos, then the todos should be in the list', async () => {
  const todos: Todo[] = [
    { id: 1, text: 'review PR' },
    { id: 2, text: 'update docs' }
  ];
  mockFetch(todos);
  const { findByText } = render(<Test />);
  await findByText(todos[0].text);
  await findByText(todos[1].text);
});

test('when clicking the new button, we should be able to add a new todo', async () => {
  const { findByTitle, findByText } = render(<Test />);
  const addButton = await findByTitle('Add Todo');  
  fireEvent.click(addButton);
  const input = await findByTitle('Todo Text');
  const button = await findByText('Save');
  fireEvent.ionChange(input, 'test todo');
  fireEvent.click(button);
  await findByText('test todo');
});