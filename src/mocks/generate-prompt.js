// mock API-endpoint for generating a prompt.
export default [
  {
    url: '/api/generate-prompt',
    method: 'post',
    response: () => {
      return {
        response: 'Test',
        remainingTokens: 2000
      };
    }
  }
];
