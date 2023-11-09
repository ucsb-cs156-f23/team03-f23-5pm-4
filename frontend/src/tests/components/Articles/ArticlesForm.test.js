import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import ArticlesForm from "main/components/Articles/ArticlesForm";
import { articlesFixtures } from "fixtures/articlesFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("ArticlesForm tests", () => {

    test("renders correctly", async () => {

        render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        await screen.findByText(/Email/); // idk what this is?
        await screen.findByText(/Create/);
    });


    test("renders correctly when passing in an Article", async () => {

        render(
            <Router  >
                <ArticlesForm initialContents={articlesFixtures.oneArticle} />
            </Router>
        );
        await screen.findByTestId(/ArticlesForm-id/);
        expect(screen.getByText(/Id/)).toBeInTheDocument();
        expect(screen.getByTestId(/ArticlesForm-id/)).toHaveValue("1");
    });


    test("Correct Error messages on bad input", async () => {

        render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        await screen.findByTestId("ArticlesForm-email");
        const urlField = screen.getByTestId("ArticlesForm-url");
        const emailField = screen.getByTestId("ArticlesForm-email");
        const dateAddedField = screen.getByTestId("ArticlesForm-dateAdded");
        const submitButton = screen.getByTestId("ArticlesForm-submit");

        fireEvent.change(urlField, { target: { value: 'bad-input' } });
        fireEvent.change(emailField, { target: { value: 'bad-input' } });
        fireEvent.change(dateAddedField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Email must be in the format user@domain.tld/);
        expect(screen.getByText(/URL must be in the format domain.tld, e.g. ucsb.edu/)).toBeInTheDocument();
    });

    test("Correct Error messages on missing input", async () => {

        render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        await screen.findByTestId("ArticlesForm-submit");
        const submitButton = screen.getByTestId("ArticlesForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/Title is required./);
        expect(screen.getByText(/URL is required./)).toBeInTheDocument();
        expect(screen.getByText(/Explanation is required./)).toBeInTheDocument();
        expect(screen.getByText(/Email is required./)).toBeInTheDocument();
        expect(screen.getByText(/DateAdded is required./)).toBeInTheDocument();
    });

    test("No Error messages on good input", async () => {

        const mockSubmitAction = jest.fn();

        render(
            <Router  >
                <ArticlesForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("ArticlesForm-email");

        const titleField = screen.getByTestId("ArticlesForm-title");
        const urlField = screen.getByTestId("ArticlesForm-url");
        const explanationField = screen.getByTestId("ArticlesForm-explanation");
        const emailField = screen.getByTestId("ArticlesForm-email");
        const dateAddedField = screen.getByTestId("ArticlesForm-dateAdded");
        const submitButton = screen.getByTestId("ArticlesForm-submit");

        fireEvent.change(titleField, { target: { value: 'How to Write in JavaScript' } });
        fireEvent.change(urlField, { target: { value: 'google.com' } });
        fireEvent.change(explanationField, { target: { value: 'for those confused' } });
        fireEvent.change(emailField, { target: { value: 'k.a.t.y.tsao@ucsb.edu' } });
        fireEvent.change(dateAddedField, { target: { value: '2023-11-08T12:00' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(screen.queryByText(/Email must be in the format user@domain.tld/)).not.toBeInTheDocument();
        expect(screen.queryByText(/URL must be in the format domain.tld, e.g. ucsb.edu/)).not.toBeInTheDocument();
        expect(screen.queryByText(/localDateTime must be in ISO format/)).not.toBeInTheDocument();

    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {

        render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        await screen.findByTestId("ArticlesForm-cancel");
        const cancelButton = screen.getByTestId("ArticlesForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


