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

});


