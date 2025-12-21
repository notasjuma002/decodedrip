import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextRequest, NextResponse } from 'next/server';

// Hardcoded credentials
const SERVICE_ACCOUNT_EMAIL = 'siteweb-drip@drip-project-481916.iam.gserviceaccount.com';
const SHEET_ID = '1fiQiU62DnWG73c3pyR4EmvKqF9sJucZKUdygQvmnEl4';
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIAdr9nWgMAnQj
L8SPc2phgaiBepM8onXhoF5w4Kab2O0ndSGpnruwNseWPfs0Pp5dFSOk+WCcA3b+
yGmyotIxfTQgQuJu0SZAi2Ou6+zLVExJy5huALShPBSDGLd2cHiI0v+j9UNI1Gjw
aL5p8HIs3S5GplXS+5WxdUCI3vCDX02AFklxWTfzE8tqTwG3qLiN4TJGw4XriHZP
c+XwlDuKRugQMfpNR16kkK0YvnTAQztazgoOHYcCpNCEzJWEB9arveL7AiOOFTWG
W8eq1Ia9e7fN9O4x+VwfBrBfqd/rknFWiKFUmQDldjlpW4PfRdsRhcveUXZyZbxW
atjCQqlXAgMBAAECggEAH2xwiamHcAuapO9GWftvhVj9A+AhmJngciM4yKdNxe1J
JV/j0BCJEIsqxHzXJkLdrWY62W/3hnY3kJl68dQJuON2TcifEXt5dRPxWh7lxJ8T
9Vba4L2U+O1wPkCjN8/n6tIBKYjJRNIKmBWnhQwqrsh5aCQ4wRNCAPBDxBKy2xDV
+P7WTwsccdlSPnlq5HCMUblgE27xuO6l3NUcy1sEzCHW8Sjg1glfJHuLnLyUfBOx
mZYwtaSygdRseAjOo/X62HxRrfGjmWwhJlt4xFSK3IJyqRj0SQcFhwOE9cM+25ul
IkdKDKE09oEdBljK/+gL9eX3Su+bwOmArjStnyZFYQKBgQD7emexHWTxvhUdorfp
8ubeFe0RLpJw0MhWcfXE1mb28IwLriyfgsAd2pX8oXh0vEXl9uVd69VueBWRIY2q
YF4S2dqAKCrE4dObc8wKNLMo1vnfPCFt50wJzUysNSFwJNskDmN8PVad0RI0wh7r
Yyqo/uXZJ9D98Z1codYoJe0pLwKBgQDLmoV9acf/rF+XF/h0BzyWq5eYqaDJD81D
5T36GznHO2+RPYs/RUK4MtCz35Mkg4vA5Yv2HK1ua2Rgm+q78qs0FkOZdvM+YASs
uUo631UEkYcv6hBt7Vgc0H+5DL4fv21XtZhy2I7oN36Zef3b8amxlcz8WonJBxuj
0a+P6aAoWQKBgQDqNfVO2m6CSyNFZ5/cLpLgMhGJ2BMhKQH8qMRZ38kjoaL82enL
Ya3l4AeiswwJxLNg2xKB57vu175WXaagEIJtEiLTCxXSKfS3qiBVPQHDPnyXcVw9
DJcf5enL1OvgkyLZsODs+/+omehX5JeBaOl5XXTaS5/0csu5UyyuVaxMlwKBgDU+
5NgmeNJJTvphn20gk1zH5S5cdhr+0eyGoA2vXw3WYlf2Y1sZjthDGcdgmcd7y2mX
3mFvoH93AFovjFS4osNNa0JQFE7kp3RQRLRewYofUN5b9Q36eweWE0Derz34Pu0o
JYUrUzwxfx8+AwCpE3rItUHtn4j+HeFarfIR4/uJAoGBALEZwliM00sbUywlWuN0
KgswtEaUNtOqHgMxAQFxhhPEFNJNPROIDCnqsGmPQAqxdQ7WOVtmfXK+AyJYYqwj
+gAHscvsjsXdi0JE0yt8BwxV7dLaXaTusKWuKKbT8JaXYHYb65Hzlc4s+ID3+8A/
RM+P8KNPq1/nzv1WnR4JKgUc
-----END PRIVATE KEY-----`;

export async function POST(req: NextRequest) {
    console.log('=== CHECKOUT API CALLED ===');

    try {
        // Step 1: Parse request body
        console.log('[Step 1] Parsing request body...');
        const body = await req.json();
        console.log('[Step 1] ✅ Order data received');

        // Step 2: Create JWT auth for Google
        console.log('[Step 2] Creating Google JWT auth...');
        console.log('[Step 2] Email:', SERVICE_ACCOUNT_EMAIL);
        const serviceAccountAuth = new JWT({
            email: SERVICE_ACCOUNT_EMAIL,
            key: PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        console.log('[Step 2] ✅ JWT auth created');

        // Step 3: Load the Google Sheet
        console.log('[Step 3] Loading Google Sheet...');
        console.log('[Step 3] Sheet ID:', SHEET_ID);
        const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();
        console.log('[Step 3] ✅ Sheet loaded:', doc.title);

        // Step 4: Get the first sheet
        console.log('[Step 4] Getting first sheet...');
        const sheet = doc.sheetsByIndex[0];
        console.log('[Step 4] ✅ Sheet name:', sheet.title);

        // Step 5: Format items for display
        console.log('[Step 5] Formatting items...');
        const itemsString = body.items
            .map((item: any) => `${item.quantity}x ${item.name.en || item.name} (${item.selectedColor}, ${item.selectedSize})`)
            .join(', ');
        console.log('[Step 5] ✅ Items:', itemsString);

        // Step 6: Add row to sheet
        // Columns: Name, Email, Phone, Address, City, Country, Items, Total, Notes
        console.log('[Step 6] Adding row to sheet...');
        await sheet.addRow({
            Name: body.customer.fullName,
            Email: body.customer.email,
            Phone: body.customer.phone,
            Address: body.customer.address,
            City: body.customer.city,
            Country: body.customer.country,
            Items: itemsString,
            Total: body.total,
            Notes: body.customer.notes || ''
        });
        console.log('[Step 6] ✅ Row added successfully!');

        console.log('=== CHECKOUT API SUCCESS ===');
        return NextResponse.json({ success: true, message: 'Order submitted successfully' });

    } catch (error: any) {
        console.error('=== CHECKOUT API ERROR ===');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Full error:', error);

        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
