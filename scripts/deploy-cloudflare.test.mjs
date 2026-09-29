import test from 'node:test';
import assert from 'node:assert/strict';
import { deploy } from './deploy-cloudflare.mjs';
const env = { CLOUDFLARE_ACCOUNT_ID: 'a'.repeat(32), CLOUDFLARE_API_TOKEN: 'test-only' };
test('missing credentials stop before network access', async () => {
  await assert.rejects(deploy({env: {}, request: () => assert.fail('network must not run')}), /Cadastre/);
});
test('denied access never deploys', async () => {
  await assert.rejects(deploy({env, request: async () => ({ok:false,status:403}), run: () => assert.fail('must not deploy')}), /HTTP 403/);
});
test('uses existing production branch without shell interpolation', async () => {
  let invoked = false;
  await deploy({env, request: async () => ({ok:true,json:async () => ({success:true,result:{production_branch:'production'}})}), run: (binary,args,options) => {
    invoked = true;
    assert.equal(args.at(-1),'production');
    assert.equal(args[args.indexOf('--project-name')+1],'hellen-xavier');
    assert.equal(options.shell,false);
    return {status:0};
  }});
  assert.ok(invoked);
});
test('missing production branch never deploys', async () => {
  await assert.rejects(deploy({env,request: async () => ({ok:true,json:async () => ({success:true,result:{}})}),run: () => assert.fail('must not deploy')}), /branch de produção/);
});
test('failed upload fails workflow', async () => {
  await assert.rejects(deploy({env,request: async () => ({ok:true,json:async () => ({success:true,result:{production_branch:'main'}})}),run: () => ({status:1})}), /publicação falhou/);
});
