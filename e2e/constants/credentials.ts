const validCreds = [
  {
    firstName: 'Testuser',
    lastName: 'Dummyone',
    email: 'dummyone@testmail.local',
    phone: '10000000100',
  },
  {
    firstName: 'Check',
    lastName: 'Sampledata',
    email: 'check.sampledata@faketest.org',
    phone: '10000000120',
  },
  {
    firstName: 'QA',
    lastName: 'Placeholder',
    email: 'qa.placeholder@mockmail.net',
    phone: '10000000130',
  },
  {
    firstName: 'Trial',
    lastName: 'Dataset',
    email: 'trial.dataset@demoaccount.io',
    phone: '10000000140',
  },
  {
    firstName: 'Fake',
    lastName: 'Tester',
    email: 'fake.tester@notreal.dev',
    phone: '10000000150',
  },
];

const invalidCreds = [
  {
    firstName: '',
    lastName: 'A',
    email: '',
    phone: '12',
  },
];

export { validCreds, invalidCreds };
