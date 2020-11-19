# helm-ts

<p float="left" style="color: red;">
  <img src="helm-icon-color.png" width="90" height="100">
  <img src="ts-logo-256.png" width="100" height="100")>
</p>


A Node/TypeScript client for Helm. It is modeled after the Helm CLI so if you're already comfortable with the CLI then using this client should be no problem for you.

## Examples

### Download and install a Helm Chart

`With Helm CLI`
```bash
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm install my-mongodb-release bitnami/mongodb
```

`With helm-ts`
```js
await helm.repo.add('bitnami', 'https://charts.bitnami.com/bitnami');
await helm.install('my-release', 'bitnami/mongodb');
```

### List Helm releases

`With Helm CLI:`
```bash
$ helm list

NAME                    NAMESPACE       REVISION        UPDATED                                 STATUS          CHART           APP VERSION
my-mongodb-release      default         1               2020-11-11 22:39:35.585098 -0500 EST    deployed        mongodb-10.0.0  4.4.1           
```

`With helm-ts`
```js
const releases: Release[] = await helm.list();
/**
 *  releases =  [
 *    {
 *      name: 'my-mongodb-release',
 *      namespace: 'default',
 *      revision: '1',
 *      updated: '2020-11-11 22:39:35.585098 -0500 EST',
 *      status: 'deployed',
 *      chart: 'mongodb-10.0.0',
 *      app_version: '4.4.1'
 *    }
 *  ]
 */
```

**Note:**
Only commands that support json output will return typed objects. Otherwise a string output is returned where present.


## Getting started

1. Install the npm package
```bash
$ npm install helm-ts
```

2. Import the package into your module
```js
import helm from 'helm-ts';
(async () => {
  const releases = await helm.list({ namespace: 'openfaas' }); // list releases in openfaas namespace
  console.log(releases);
  /**
   * [
   *   {
   *     name: 'openfaas',
   *     namespace: 'openfaas',
   *     revision: '1',
   *     updated: '2020-10-25 22:02:45.325836 -0400 EDT',
   *     status: 'deployed',
   *     chart: 'openfaas-6.0.4',
   *     'app_version': ''
   *   }
   * ]
   */
})();
```

## Roadmap
This project is currently a WIP. I will be mostly focused on implementing the most commonly used helm commands first.
