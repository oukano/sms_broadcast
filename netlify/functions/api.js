exports.handler = async (event, context) => {
  return {
      statusCode: 200,
      body: JSON.stringify({
      api: process.env.INFOBIP_API_KEY
      }),
  }
}
