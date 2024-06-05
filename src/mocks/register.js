// mock API-endpoint that register an user by providing a mock-user-id.
export default [
  {
    url: '/api/register',
    method: 'post',
    response: () => {
      return {
        userId: Math.random()
      };
    }
  }
];


