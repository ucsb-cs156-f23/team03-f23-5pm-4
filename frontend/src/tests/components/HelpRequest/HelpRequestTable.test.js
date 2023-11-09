import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { helpRequestFixtures } from "fixtures/helpRequestFixtures";
import HelpRequestTable from "main/components/HelpRequest/HelpRequestTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe("HelpRequestTable tests", () => {
  const queryClient = new QueryClient();

  const expectedHeaders = ["id", "RequesterEmail", "TeamId", "TableOrBreakoutRoom", "RequestTime", "Explanation", "Solved"];
  const expectedFields = ["id", "requesterEmail", "teamId", "tableOrBreakoutRoom", "requestTime", "explanation", "solved"];
  const testId = "HelpRequestsTable";

  test("renders empty table correctly", () => {
    
    // arrange
    const currentUser = currentUserFixtures.adminUser;

    // act
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HelpRequestTable helpRequests={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // assert
    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const fieldElement = screen.queryByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(fieldElement).not.toBeInTheDocument();
    });
  });

  test("Has the expected column headers, content and buttons for admin user", () => {
    const currentUser = currentUserFixtures.adminUser;
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HelpRequestTable helpRequests={helpRequestFixtures.threeHelpRequests} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // assert
    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-requesterEmail`)).toHaveTextContent("another@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-teamId`)).toHaveTextContent("one");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-tableOrBreakoutRoom`)).toHaveTextContent("table");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-requestTime`)).toHaveTextContent("2021-10-01T12:00:00");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-explanation`)).toHaveTextContent("I need help with my homework");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-solved`)).toHaveTextContent("false");

    expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("3");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-requesterEmail`)).toHaveTextContent("joe@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-teamId`)).toHaveTextContent("two");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-tableOrBreakoutRoom`)).toHaveTextContent("breakout");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-requestTime`)).toHaveTextContent("2021-10-01T12:00:22");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-explanation`)).toHaveTextContent("I need help with my OTHER homework");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-solved`)).toHaveTextContent("true");

    const editButton = screen.getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("btn-primary");

    const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");

  });

  test("Has the expected column headers, content for ordinary user", () => {
    // arrange
    const currentUser = currentUserFixtures.userOnly;

    // act
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HelpRequestTable helpRequests={helpRequestFixtures.threeHelpRequests} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // assert
    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });
    expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-requesterEmail`)).toHaveTextContent("another@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-teamId`)).toHaveTextContent("one");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-tableOrBreakoutRoom`)).toHaveTextContent("table");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-requestTime`)).toHaveTextContent("2021-10-01T12:00:00");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-explanation`)).toHaveTextContent("I need help with my homework");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-solved`)).toHaveTextContent("false");

    expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("3");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-requesterEmail`)).toHaveTextContent("joe@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-teamId`)).toHaveTextContent("two");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-tableOrBreakoutRoom`)).toHaveTextContent("breakout");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-requestTime`)).toHaveTextContent("2021-10-01T12:00:22");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-explanation`)).toHaveTextContent("I need help with my OTHER homework");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-solved`)).toHaveTextContent("true");
    
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });


  test("Edit button navigates to the edit page", async () => {
    const currentUser = currentUserFixtures.adminUser;
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HelpRequestTable helpRequests={helpRequestFixtures.threeHelpRequests} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-requesterEmail`)).toHaveTextContent("another@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-teamId`)).toHaveTextContent("one");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-tableOrBreakoutRoom`)).toHaveTextContent("table");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-requestTime`)).toHaveTextContent("2021-10-01T12:00:00");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-explanation`)).toHaveTextContent("I need help with my homework");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-solved`)).toHaveTextContent("false");

    const editButton = screen.getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();

    // act - click the edit button
    fireEvent.click(editButton);

    // assert - check that the navigate function was called with the expected path
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/helprequests/edit/2'));

  });

  test("Delete button calls delete callback", async () => {
    // arrange
    const currentUser = currentUserFixtures.adminUser;

    // act - render the component
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HelpRequestTable helpRequests={helpRequestFixtures.threeHelpRequests} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // assert - check that the expected content is rendered
    expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-requesterEmail`)).toHaveTextContent("another@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-teamId`)).toHaveTextContent("one");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-tableOrBreakoutRoom`)).toHaveTextContent("table");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-requestTime`)).toHaveTextContent("2021-10-01T12:00:00");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-explanation`)).toHaveTextContent("I need help with my homework");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-solved`)).toHaveTextContent("false");

    const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();

    // act - click the delete button
    fireEvent.click(deleteButton);
  });
});