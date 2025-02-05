import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const testCasesPLNToUSD = [
	{ amount: 100, result: '$28.57' },
	{ amount: 20, result: '$5.71' },
	{ amount: 200, result: '$57.14' },
	{ amount: 345, result: '$98.57' },
];

const testCaseUSDToPLN = [
	{ amount: 100, result: '350' },
	{ amount: 20, result: '70' },
	{ amount: 200, result: '700' },
	{ amount: 345, result: '1,207.50' },
];

const testCasesCurrency = [
	{ from: 'USD', to: 'USD' },
	{ from: 'USD', to: 'PLN' },
	{ from: 'PLN', to: 'USD' },
	{ from: 'PLN', to: 'PLN' },
];

describe('Component ResultBox', () => {
	
	it('should render without crashing', () => {
		render(<ResultBox from="PLN" to="USD" amount={100} />);
	});

	for (const { amount, result } of testCasesPLNToUSD) {
		it(`should render proper info about conversion when PLN -> USD`, () => { 
			render(<ResultBox from="PLN" to="USD" amount={amount} />);
			const output = screen.getByTestId('output');
			expect(output).toHaveTextContent(`PLN ${amount}.00 = ${result}`);
		});

		cleanup();
	}

	for (const { amount, result } of testCaseUSDToPLN) {
		it(`should render proper info about conversion when USD -> PLN`, () => { 
			render(<ResultBox from="USD" to="PLN" amount={amount} />);
			const output = screen.getByTestId('output');
			expect(output).toHaveTextContent(`$${amount}.00 = PLN ${result}`);
		});

		cleanup();
	}
	
	it('should render proper info about conversion when PLN -> PLN', () => {
		render(<ResultBox from="PLN" to="PLN" amount={100} />);
		const output = screen.getByTestId('output');
		expect(output).toHaveTextContent('PLN 100.00 = PLN 100.00');
	});

	it('should render proper info about conversion when USD -> USD', () => {
		render(<ResultBox from="USD" to="USD" amount={100} />);
		const output = screen.getByTestId('output');
		expect(output).toHaveTextContent('$100.00 = $100.00');
	});

	for (const { from, to } of testCasesCurrency) {
		it('should render "Wrong value" when amount is less then zero', () => {
			render(<ResultBox from={from} to={to} amount={-100} />);
			const output = screen.getByTestId('output');
			expect(output).toHaveTextContent('Wrong value...');
		});
		
		cleanup();
	}
});
