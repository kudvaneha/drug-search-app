import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:5000/drugs', (req, res, ctx) => {
    const query = req.url.searchParams.get('name');

    if (query === 'aspirin') {
      return res(
        ctx.json({
          drugGroup: {
            conceptGroup: [
              {
                conceptProperties: [
                  { name: 'Aspirin', rxcui: '12345' }
                ]
              }
            ]
          }
        })
      );
    }

    return res(
      ctx.json({
        drugGroup: { conceptGroup: [] }
      })
    );
  }),

  rest.get('http://localhost:5000/spellingsuggestions', (req, res, ctx) => {
    const query = req.url.searchParams.get('name');

    if (query === 'zyrte') {
      return res(
        ctx.json({
          suggestionGroup: {
            suggestionList: { suggestion: ['zyrtec'] }
          }
        })
      );
    }

    return res(
      ctx.json({
        suggestionGroup: { suggestionList: { suggestion: [] } }
      })
    );
  }),

  rest.get('http://localhost:5000/drugDetails', (req, res, ctx) => {
    const name = req.url.searchParams.get('name');

    if (name === 'Aspirin') {
      return res(
        ctx.json({
          properties: {
            name: 'Aspirin',
            synonym: 'Acetylsalicylic Acid',
            rxcui: '12345'
          }
        })
      );
    }

    return res(
      ctx.json({
        properties: {}
      })
    );
  })
];
