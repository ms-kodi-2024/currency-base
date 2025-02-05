import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@testing-library/react';

const testCases = [
	{ amount: '100', from: 'PLN', to: 'USD' },
	{ amount: '20', from: 'USD', to: 'PLN' },
	{ amount: '200', from: 'PLN', to: 'USD' },
	{ amount: '345', from: 'USD', to: 'PLN' },
];

describe('Component CurrencyForm', () => {
	
	for(const testObj of testCases) {
		
		it('should run action callback with proper data on form submit', () => {
			const action = jest.fn();
		
			// render component
			render(<CurrencyForm action={action} />);
		
			// find “convert” button
			const submitButton = screen.getByText('Convert');
		
			// find fields elems
			const amountField = screen.getByTestId('amount');
			const fromField = screen.getByTestId('from-select');
			const toField = screen.getByTestId('to-select');
		
			// set test values to fields
			userEvent.clear(amountField)
			userEvent.type(amountField, testObj.amount);
			userEvent.selectOptions(fromField, testObj.from);
			userEvent.selectOptions(toField, testObj.to);
		
			// simulate user click on "convert" button
			userEvent.click(submitButton);
		
			// check if action callback was called once and with proper argument
			expect(action).toHaveBeenCalledTimes(1);
			expect(action).toHaveBeenCalledWith({
				amount: parseInt(testObj.amount, 10),
        from: testObj.from,
				to: testObj.to,
			});
		});

		// unmount component
		cleanup();
	}

});