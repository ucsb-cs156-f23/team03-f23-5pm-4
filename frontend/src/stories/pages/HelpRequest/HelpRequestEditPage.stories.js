
import React from 'react';
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { helpRequestFixtures } from "fixtures/helpRequestFixtures";
import { rest } from "msw";

import HelpRequestsEditPage from "main/pages/HelpRequest/HelpRequestEditPage";

export default {
    title: 'pages/HelpRequest/HelpRequestsEditPage',
    component: HelpRequestsEditPage
};

const Template = () => <HelpRequestsEditPage storybook={true}/>;

export const Default = Template.bind({});
Default.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res( ctx.json(apiCurrentUserFixtures.userOnly));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/HelpRequests', (_req, res, ctx) => {
            return res(ctx.json(helpRequestFixtures.threeHelpRequests[0]));
        }),
        rest.put('/api/HelpRequests', async (req, res, ctx) => {
            var reqBody = await req.text();
            window.alert("PUT: " + req.url + " and body: " + reqBody);
            return res(ctx.status(200),ctx.json({}));
        }),
    ],
}


