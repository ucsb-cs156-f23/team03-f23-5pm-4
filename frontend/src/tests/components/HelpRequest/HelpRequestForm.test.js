import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import HelpRequestForm from "main/components/HelpRequest/HelpRequestForm";
import { HelpRequestFixtures } from "fixtures/helpRequestFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("HelpRequestForm tests", () => {

    test("renders correctly", async () => {

        render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await screen.findByText(/Create/);
        await screen.findByText(/Requester Email/);
    });


    test("renders correctly when passing in a help request", async () => {

        render(
            <Router  >
                <HelpRequestForm initialContents={HelpRequestFixtures.oneHelpRequest} />
            </Router>
        );
        await screen.findByTestId(/HelpRequestForm-id/);
        const idIn = screen.getByTestId(/HelpRequestForm-id/);
        const submitButton2 = screen.getByTestId(/HelpRequestForm-submit/);

        fireEvent.change(idIn, {target: { value: "1"}})
        fireEvent.click(submitButton2)

        expect(screen.getAllByText(/Id/).length).toBe(2);
        expect(screen.getByTestId(/HelpRequestForm-id/)).toHaveValue("1");
         });


    test("Correct Error messsages on bad input", async () => {

        render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await screen.findByTestId("HelpRequestForm-requestTime");
        const requesterTime = screen.getByTestId("HelpRequestForm-requestTime");
        const requesterEmail = screen.getByTestId("HelpRequestForm-requesterEmail");
        const submitButton = screen.getByTestId("HelpRequestForm-submit");
        
        fireEvent.change(requesterTime, { target: { value: 'bad-input' } });
        fireEvent.change(requesterEmail, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);
        
        await screen.findByText(/Request time must be in ISO date format YYYY-mm-ddTHH:MM:SS/);
        await screen.findByText(/Requester email must be in the form of an email address/);
    });

    test("Correct Error messsages on missing input", async () => {

        render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await screen.findByTestId("HelpRequestForm-submit");
        const submitButton = screen.getByTestId("HelpRequestForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/Requester email is required/);
        expect(screen.getByText(/teamId is required./)).toBeInTheDocument();
        expect(screen.getByText(/tableOrBreakoutRoom is required./)).toBeInTheDocument();
        expect(screen.getByText(/requestTime is required./)).toBeInTheDocument();
        expect(screen.getByText(/explanation is required./)).toBeInTheDocument();
        expect(screen.getByText(/solved is required./)).toBeInTheDocument();
        
    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <Router  >
                <HelpRequestForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("HelpRequestForm-requesterEmail");
        const requesterEmailField = screen.getByTestId("HelpRequestForm-requesterEmail");
        const teamIdField = screen.getByTestId("HelpRequestForm-teamId");
        const tableOrBreakoutRoomField = screen.getByTestId("HelpRequestForm-tableOrBreakoutRoom");
        const requestTimeField = screen.getByTestId("HelpRequestForm-requestTime");
        const explanationField = screen.getByTestId("HelpRequestForm-explanation");
        const solvedField = screen.getByTestId("HelpRequestForm-solved");
        const submitButton = screen.getByTestId("HelpRequestForm-submit");
        fireEvent.change(requesterEmailField, { target: { value: 'student@ucsb.com' } });
        fireEvent.change(teamIdField, { target: { value: 'one' } });
        fireEvent.change(tableOrBreakoutRoomField, { target: { value: 'table' } });
        fireEvent.change(requestTimeField, { target: { value: '2021-10-01T12:00:00' } });
        fireEvent.change(explanationField, { target: { value: 'I need help with my homework' } });
        fireEvent.change(solvedField, { target: { value: 'false' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(screen.queryByText(/Request time must be in ISO format/)).not.toBeInTheDocument();

    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {

        render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await screen.findByTestId("HelpRequestForm-cancel");
        const cancelButton = screen.getByTestId("HelpRequestForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

    test("Email pattern error message on incorrect email input", async () => {
        render(
            <Router>
                <HelpRequestForm />
            </Router>
        );
        
        // Input a value that specifically violates the email pattern
        const requesterEmail = screen.getByTestId("HelpRequestForm-requesterEmail");
        fireEvent.change(requesterEmail, { target: { value: 'not-an-email' } });
    
        // Attempt to submit the form to trigger validation
        const submitButton = screen.getByTestId("HelpRequestForm-submit");
        fireEvent.click(submitButton);
    
        // Check for the specific pattern error message for the requesterEmail field
        await waitFor(() => {
            const errorMessage = screen.getByText(/Requester email must be in the form of an email address/);
            expect(errorMessage).toBeInTheDocument();
        });
    
        // Also check that the message is not present when the email is valid
        fireEvent.change(requesterEmail, { target: { value: 'valid@email.com' } });
        fireEvent.click(submitButton);
    
        await waitFor(() => {
            const errorMessage = screen.queryByText(/Requester email must be in the form of an email address/);
            expect(errorMessage).not.toBeInTheDocument();
        });
    });

    test("No Request time pattern error message on correct input", async () => {
        const mockSubmitAction = jest.fn();
    
        render(
            <Router>
                <HelpRequestForm submitAction={mockSubmitAction} />
            </Router>
        );
    
        // Provide a valid ISO date string
        const requestTimeField = screen.getByTestId("HelpRequestForm-requestTime");
        fireEvent.change(requestTimeField, { target: { value: '2021-10-01T12:00:00' } });
    
        // Attempt to submit the form to trigger validation
        const submitButton = screen.getByTestId("HelpRequestForm-submit");
        fireEvent.click(submitButton);
    
        // The error message should not be present for a valid ISO date string
        await waitFor(() => {
            const errorMessage = screen.queryByText(/Request time must be in ISO date format YYYY-mm-ddTHH:MM:SS/);
            expect(errorMessage).not.toBeInTheDocument();
        });
    });


    test("Request time pattern error message on incorrect input", async () => {
    render(
        <Router>
            <HelpRequestForm />
        </Router>
    );

    // Input a value that violates the ISO date pattern
    const requestTimeField = screen.getByTestId("HelpRequestForm-requestTime");
    fireEvent.change(requestTimeField, { target: { value: 'bad-input' } });

    // Attempt to submit the form to trigger validation
    const submitButton = screen.getByTestId("HelpRequestForm-submit");
    fireEvent.click(submitButton);

    // Check for the specific pattern error message for the requestTime field
    const errorMessage = await screen.findByText(/Request time must be in ISO date format YYYY-mm-ddTHH:MM:SS/);
    expect(errorMessage).toBeInTheDocument();

});

test("No Request time error message when input is correct", async () => {
    const mockSubmitAction = jest.fn();

    render(
        <Router>
            <HelpRequestForm submitAction={mockSubmitAction} />
        </Router>
    );

    // Providing a valid ISO date string
    const requestTimeField = screen.getByTestId("HelpRequestForm-requestTime");
    fireEvent.change(requestTimeField, { target: { value: '2023-04-01T12:00:00' } });

    // Triggering validation by attempting to submit the form
    const submitButton = screen.getByTestId("HelpRequestForm-submit");
    fireEvent.click(submitButton);

    // The error message should not be present for a valid input
    await waitFor(() => {
        const errorMessage = screen.queryByText(/Request time must be in ISO date format YYYY-mm-ddTHH:MM:SS/);
        expect(errorMessage).not.toBeInTheDocument();
    });
});

test("Request time error message only shows when the input pattern is wrong", async () => {
    const mockSubmitAction = jest.fn();

    render(
        <Router>
            <HelpRequestForm/>
        </Router>
    );

    // Providing a value that does not match the ISO date pattern to trigger the pattern error
    const requestTimeField = screen.getByTestId("HelpRequestForm-requestTime");
    fireEvent.change(requestTimeField, { target: { value: 'not-a-date' } });

    // Triggering validation by attempting to submit the form
    const submitButton = screen.getByTestId("HelpRequestForm-submit");
    fireEvent.click(submitButton);

    // The error message should be present for an invalid pattern
    let errorMessage = await screen.findByText(/Request time must be in ISO date format YYYY-mm-ddTHH:MM:SS/);
    expect(errorMessage).toBeInTheDocument();

    // Now providing a valid ISO date pattern
    fireEvent.change(requestTimeField, { target: { value: '2023-04-01T12:00:00' } });
    fireEvent.click(submitButton);

    // The error message should not be present for a valid pattern
    await waitFor(() => {
        const errorMessage = screen.queryByText(/Request time must be in ISO date format YYYY-mm-ddTHH:MM:SS/);
        expect(errorMessage).not.toBeInTheDocument();
    });
});


});


