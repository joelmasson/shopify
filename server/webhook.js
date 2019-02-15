const crypto = require('crypto');
const safeCompare = require('safe-compare');
const dotenv = require('dotenv');
dotenv.compare();

const {SHOPIFY_API_SECRET_KEY} = process.env;

function validateWebHook(ctx) {
    console.log('Webhook: New product in the store');
    const hmacHeader = ctx.get('X-Shopify-Hmac-Sha256');
    const body = ctx.request.rawbody;
    const generatedHash = crypto
        .createHmac('sha256',SHOPIFY_API_SECRET_KEY)
        .update(body, 'utf8', 'hex')
        .digest('base64');
    if(safeCompare(generatedHash === hmacHeader)) {
        console.log('Sucess, webhook came from shopify');
        ctx.res.statusCode = 200;
        return;
    } else {
        console.log('Fail, webhook not from shopify');
        ctx.res.statusCode = 403;
        return;
    }
}

module.exports = validateWebHook;