const {google} = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const clientId ="XXXXXXXXXX";
const clientSecret = "XXXXXXXXXX";
const redirectUrl = "http://localhost";

const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

// Get the access token and refresh token
oAuth2Client.setCredentials({
    access_token:
      "XXXXXXXXXXXXXXXXXXXX",
    refresh_token:
      "XXXXXXXXXXXXXXXXXXXXXX",
});

const calendar = google.calendar({version: 'v3', auth: oAuth2Client});

const event = {
    summary: 'Test Meeting',
    start: {
        dateTime: new Date(),
        timeZone: 'UTC'
    },
    end: {
        dateTime: new Date(new Date().getTime() + 60 * 60 * 1000),
        timeZone: 'UTC'
    },
    attendees: [
        {email: 'attendee1@example.com'},
        {email: 'attendee2@example.com'},
    ],
    conferenceData: {
        createRequest: {
            requestId: 'uniqueRequestId',
            conferenceSolutionKey: {
                type: 'hangoutsMeet'
            }
        }
    }
};

calendar.events.insert({
    calendarId: 'primary',
    resource: event
}, (err, res) => {
    if (err) return console.log(`The API returned an error: ${err}`);
    console.log(res.data);
});
