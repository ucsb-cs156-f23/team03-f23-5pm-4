import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function HelpRequestForm({ initialContents, submitAction, buttonLabel = "Create" }) {
    const{
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    // Stryker disable next-line all
    const email_regex = /[a-z0-9_.]+@[a-z]+\.[a-z]+/i;
    return (

        <Form onSubmit={handleSubmit(submitAction)}>


            <Row>

                {initialContents && (
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="id">Id</Form.Label>
                            <Form.Control
                            data-testid="HelpRequestForm-id"
                            id="id"
                            type="text"
                            {...register("id")}
                            value={initialContents.id}
                            disabled
                            />
                        </Form.Group>
                    </Col>
                )}

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="requesterEmail">Requester Email</Form.Label>
                        <Form.Control
                            data-testid="HelpRequestForm-requesterEmail"
                            id="requesterEmail"
                            type="text"
                            isInvalid={Boolean(errors.requesterEmail)}
                            {...register("requesterEmail", { required: true, pattern: email_regex})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.requesterEmail && 'Requester email is required'}
                            {errors.requesterEmail?.type === 'pattern' && 'Requester email must be in the form of an email address'}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="teamId">Team Id</Form.Label>
                        <Form.Control
                            data-testid="HelpRequestForm-teamId"
                            id="teamId"
                            type="text"
                            isInvalid={Boolean(errors.teamId)}
                            {...register("teamId", { required: true})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.teamId && 'teamId is required. '}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                    <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="tableOrBreakoutRoom">Table Or Breakout Room</Form.Label>
                        <Form.Control
                            data-testid="HelpRequestForm-tableOrBreakoutRoom"
                            id="tableOrBreakoutRoom"
                            type="text"
                            isInvalid={Boolean(errors.tableOrBreakoutRoom)}
                            {...register("tableOrBreakoutRoom", { required: true})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.tableOrBreakoutRoom && 'tableOrBreakoutRoom is required. '}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>   
                <Form.Group className="mb-3" >
                        <Form.Label htmlFor="requestTime"> Request Time </Form.Label>
                        <Form.Control
                            data-testid="HelpRequestForm-requestTime"
                            id="requestTime"
                            type="text"
                            isInvalid={Boolean(errors.requestTime)}
                            {...register("requestTime", { required: true, pattern: isodate_regex })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.requestTime && 'requestTime is required.'}
                                {errors.requestTime?.type === 'pattern' && 'Request time must be in ISO date format YYYY-mm-ddTHH:MM:SS'}
                            </Form.Control.Feedback>
                        </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="explanation">explanation</Form.Label>
                        <Form.Control
                            data-testid="HelpRequestForm-explanation"
                            id="explanation"
                            type="text"
                            isInvalid={Boolean(errors.explanation)}
                            {...register("explanation", { required: true})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.explanation && 'explanation is required. '}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="solved">Solved</Form.Label>
                        <Form.Control
                            data-testid="HelpRequestForm-solved"
                            id="solved"
                            type="text"
                            isInvalid={Boolean(errors.solved)}
                            {...register("solved", { required: true})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.solved && 'solved is required.'}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>  
                    
                    <Col>
                        <Button
                            type="submit"
                            data-testid="HelpRequestForm-submit"
                        >
                            {buttonLabel}
                        </Button>
                        <Button
                            variant="Secondary"
                            onClick={() => navigate(-1)}
                            data-testid="HelpRequestForm-cancel"
                        >
                            Cancel
                        </Button>
                    </Col>
                </Row>
                </Form>
    )

}
export default HelpRequestForm;
