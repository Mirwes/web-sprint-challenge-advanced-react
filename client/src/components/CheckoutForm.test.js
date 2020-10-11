import React from "react";
import { render, getByText } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    const { getByText } = render (<CheckoutForm />);
    getByText(/^Checkout Form$/);
});

test("form shows success message on submit with form details", async () => {
    const {getByRole, getByTestId, getByLabelText } = render(<CheckoutForm />);

    const firstInput = getByLabelText('First Name:');
    const lastInput = getByLabelText('Last Name:');
    const addressInput = getByLabelText('Address:');
    const cityInput = getByLabelText('City:');
    const stateInput = getByLabelText('State:');
    const zipInput = getByLabelText('Zip:');
    const submitButton = getByRole('button');

    const firstName = 'Mirwes';
    const lastName = 'Hakimi';
    const address = '540 Buckingham Rd';
    const city = 'Richardson';
    const state = 'TX';
    const zip = '75081';

    await act(async () => {
        await userEvent.type(firstInput, firstName);
        await userEvent.type(lastInput, lastName);
        await userEvent.type(addressInput, address);
        await userEvent.type(cityInput, city);
        await userEvent.type(stateInput, state);
        await userEvent.type(zipInput, zip);
        submitButton.click();

    });

    const submitMessage = getByTestId('successMessage');

    const expected = `You have ordered some plants! Woo-hoo!🎉Your new
    green friends will be shipped to:${firstName} ${lastName} ${address} ${city}, ${state} ${zip}`
    
    expect(submitMessage.textContent).toBe(expected);
});
