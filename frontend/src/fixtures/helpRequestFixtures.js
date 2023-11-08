const HelpRequestFixtures = {

    oneHelpRequest: {
        "id": 1,
        "requesterEmail": "student@ucsb.edu",
        "teamId": "one",
        "tableOrBreakoutRoom": "table",
        "requestTime": "2021-10-01T12:00:00",
        "explanation": "I need help with my homework",
        "solved": false
    },
    threeHelpRequests: [
        {
            "id": 1,
            "requesterEmail": "another@ucsb.edu",
            "teamId": "one",
            "tableOrBreakoutRoom": "table",
            "requestTime": "2021-10-01T12:00:00",
            "explanation": "I need help with my homework",
            "solved": false

        },
        {
            "id": 2,
            "requesterEmail": "joe@ucsb.edu",
            "teamId": "two",
            "tableOrBreakoutRoom": "breakout",
            "requestTime": "2021-10-01T12:00:22",
            "explanation": "I need help with my OTHER homework",
            "solved": true
        },
        {
            "id": 3,
            "requesterEmail": "guacho@ucsb.edu",
            "teamId": "three",
            "tableOrBreakoutRoom": "breakout",
            "requestTime": "2021-10-01T12:00:33",
            "explanation": "I need help with my OTHER OTHER homework",
            "solved": false
        }
    ]

    


};

export { HelpRequestFixtures };