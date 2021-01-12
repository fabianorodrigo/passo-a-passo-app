# passo-a-passo-app

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

### Comando de instalação via Helm

```bash
helm install passoapasso --kube-context <nome contexto no kubeconfig> --create-namespace ./charts/passoapasso --set istio.gateway.host=<urlacesso.meudominio.com> --set deployment.container.variables.configMap.MONGO_HOST=mongodb.passoapasso.svc.cluster.local
```
