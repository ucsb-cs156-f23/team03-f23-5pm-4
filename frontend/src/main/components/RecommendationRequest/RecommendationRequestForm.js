import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function RecommendationRequestForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    
    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker restore all
   
    const navigate = useNavigate();

    const testIdPrefix = "RecommendationRequestForm";

     // Stryker disable next-line Regex
    const date_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\D)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    // Stryker disable next-line Regex
    const done_regex = /^([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])$/i; 


    return (
        <Form onSubmit={handleSubmit(submitAction)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">id</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-id"}
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialContents.id}
                        disabled
                    />
                </Form.Group>
            )}
            
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="requesterEmail">Requester Email</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-requesterEmail"}
                    id="requesterEmail"
                    type="text"
                    isInvalid={Boolean(errors.requesterEmail)}
                    {...register("requesterEmail", {
                        required: "Requester Email is required"
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.requesterEmail?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="professorEmail">Professor Email</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-professorEmail"}
                    id="professorEmail"
                    type="text"
                    isInvalid={Boolean(errors.professorEmail)}
                    {...register("professorEmail", {
                        required: "Professor Email is required"
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.professorEmail?.message}
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" >
                <Form.Label htmlFor="explanation">Explanation</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-explanation"}
                    id="explanation"
                    type="text"
                    isInvalid={Boolean(errors.explanation)}
                    {...register("explanation", {
                        required: "Explanation is required"
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.explanation?.message}
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateRequested">Date Requested</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-dateRequested"}
                    id="dateRequested"
                    type="datetime-local"
                    isInvalid={Boolean(errors.dateRequested)}
                    {...register("dateRequested", {
                        required:"date requested is required", pattern: date_regex 
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateRequested?.message} {'Date Requested must be in ISO format'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateNeeded">Date Needed</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-dateNeeded"}
                    id="dateNeeded"
                    type="datetime-local"
                    isInvalid={Boolean(errors.dateNeeded)}
                    {...register("dateNeeded", {
                        required: "date needed is required", pattern: date_regex 
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateNeeded?.message} {'Date Needed must be in ISO format'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="done">Done</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-done"}
                    id="done"
                    type="text"
                    isInvalid={Boolean(errors.done)}
                    {...register("done", {
                        required: "Done is required", pattern: done_regex 
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.done?.message} {'Done must be true or false'}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid={testIdPrefix + "-submit"}
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid={testIdPrefix + "-cancel"}
            >
                Cancel
            </Button>

        </Form>

    )
}

export default RecommendationRequestForm;