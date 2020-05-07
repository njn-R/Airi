module.exports = 
{
    authorize,
}

const { google } = require('googleapis')
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
function authorize() 
{
    return new Promise(resolve => {
        const jwt = new google.auth.JWT(process.env.GOOGLE_CLIENT_EMAIL, null,  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), SCOPES)
        jwt.authorize(() => resolve(jwt));
    });
}