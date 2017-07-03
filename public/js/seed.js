window.Seed = (function () {
  const projects = [
    {
      id: 1,
      title: 'leweb',
      path: '',
      autoDeploy: false,
      redeploying: false,
      rebuilding: false,
    },
    {
      id: 2,
      title: 'cpweb',
      path: '',
      autoDeploy: true,
      redeploying: false,
      rebuilding: false,
    },
    {
      id: 3,
      title: 'boweb',
      path: '',
      autoDeploy: false,
      redeploying: false,
      rebuilding: true,
    }
  ];

  return { projects: projects };
}());
