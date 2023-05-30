# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Let's break down into 4 individual tickets to complete it.

## Ticket 1: Add new field to Agent table

-- Description:

- To show custom Agent Id, new field called customIds in the Agents table of the database

-- Acceptance Criteria:

- The type of new field should be array and be able to contain several custom id associated with several Facility.

-- Effort Estimate: 30 minutes

-- Implementation Details:

- Update Agents model and create migration file
- Migrate updated Agents model into database

## Ticket 2: Allow Facilities to Manage Custom Agent Ids for Agents they work with

-- Description:

- Facilities should be able to manage and save their own custom ids for each Agent they work with.

-- Acceptance Criteria:

- Facilities should have the ability to set a custom id for each Agent they work with.
- Facilities should have the ability to update or modify the custom id for an Agent.
- Newly created custom ID should be added into new field as one element of array in database
- Removed custom ID should be removed from custom Ids array in database
- Modified custom ID should be modified in database.

-- Effort Estimate: 3 hours

-- Implementation Details:

- Create a new API endpoint /facility/agent/:agentId/custom-id to allow Facilities to set or update custom ids for Agents.
- Implement the necessary database operations to store and retrieve the custom ids.
- Add validation checks to ensure uniqueness and length limits for custom ids.
- Modify the user interface to provide Facilities with the ability to manage custom ids for Agents.
- To separate facilities saved into new custom ID array, add prefix for facility ID like `facilityId_newCustomID`

## Ticket 3: Update Agent Id on Generated Reports

-- Description:

- The goal of this ticket is to allow Facilities to use new custom IDs on the generated reports. This requires updating the report generation process to fetch and display the custom ids instead of the internal database ids.

-- Acceptance Criteria:

- The report generation process should fetch the custom id of each Agent associated with the Shifts.
- The custom ids should be displayed on the generated reports.
- If a custom id is not available for an Agent, the internal database id should be used as a fallback.

-- Effort Estimate: 3 hours

-- Implementation Details:

- Modify the function getShiftsByFacility to include the custom id of each Agent in the returned Shifts data.
- Update the function generateReport to use the custom id when displaying Agent information on the report.
- Handle cases where a custom id is not available and fall back to using the internal database id.

## Ticket 4: Add Unit Tests for Report Generation

-- Description:

- The report generation process currently lacks automated tests. This ticket involves adding unit tests to cover the functionality of the generateReport function and ensure its correctness and stability.

-- Acceptance Criteria:

- Write unit tests to cover different scenarios of the generateReport function, including valid inputs, custom id fallback, and error handling.
- Ensure that the existing functionality is not broken by the new tests.
- Aim for high test coverage to minimize the chances of undetected issues.

-- Effort Estimate: 3 hours

-- Implementation Details:

- Set up a testing framework (e.g., Jest) to write and execute unit tests for the generateReport function.
- Write test cases to cover different scenarios, including positive cases, edge cases, and error cases.
- Verify that the custom id is correctly displayed on the generated reports.
- Validate that error cases are handled properly and appropriate error messages or notifications are generated.
