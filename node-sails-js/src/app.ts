import { GearApi, GearApiOptions, GearKeyring } from '@gear-js/api';
import { ProviderInterface } from '@polkadot/rpc-provider/types';
import { Sails } from 'sails-js';
import { Command } from 'commander';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import express from 'express';
const app = express();
const port = 3000;
const program = new Command();

export const accountName = '';
export const mnemonic = "";
export const { seed } = GearKeyring.generateSeed(mnemonic);


const idl_content = 'type TrafficLightEvent = enum {' +
  'Green,' +
  'Yellow,' +
  'Red,' +
'};' +
'type IoTrafficLightState = struct {' +
  'current_light: str,' +
  'all_users: vec struct { actor_id, str },' +
'};' +
'constructor {' +
  'New : ();' +
'};' +
'service TrafficLight {' +
  'Green : () -> TrafficLightEvent;' +
  'Red : () -> TrafficLightEvent;' +
  'Yellow : () -> TrafficLightEvent;' +
  'query TrafficLightState : () -> IoTrafficLightState;' +
'};';




app.get('/first', async (req, res) => {
  const apiOptions: GearApiOptions = {
    providerAddress: "wss://testnet.vara.network",
  };  
  const api = await GearApi.create(apiOptions);
  const keyring = await GearKeyring.fromSeed(seed, accountName);
  const sails = await Sails.new();

  sails.setApi(api);
  sails.parseIdl(idl_content);
  sails.setProgramId("0xab95283752219e28fe62e637533d49e3a282f3c2943a05415f227811ebe4420c");

  console.log('\nDOING A TRANSACTION:');
  const transaction = await sails
    .services
    .TrafficLight
    .functions
    .Green()
    .withAccount(keyring)
    .withGas(100_000_000_000n);
    // .calculateGas(true, 40);
  
  console.log('Begin sign');
  const { msgId: msgId2, blockHash: blockHash2, response: response2 } = await transaction.signAndSend();
  console.log('end sign');

  console.log(`AddSlotPart msg included in block ${blockHash2}. Message id: ${msgId2}`);

  try {
    console.log('Begin response');
    const result = await response2();
    console.log('AddSlotPart executed successfully. Response:', result);
  } catch (error) {
    console.error(error);
  }

  res.send('Transaction 1 finished!');
});




app.get('/second', async (req, res) => {
  const apiOptions: GearApiOptions = {
    providerAddress: "wss://testnet.vara.network",
  };  
  const api = await GearApi.create(apiOptions);
  const keyring = await GearKeyring.fromSeed(seed, accountName);
  const sails = await Sails.new();

  sails.setApi(api);
  sails.parseIdl(idl_content);
  sails.setProgramId("0xab95283752219e28fe62e637533d49e3a282f3c2943a05415f227811ebe4420c");

  console.log('\nDOING A TRANSACTION:');
  const transaction = await sails
    .services
    .TrafficLight
    .functions
    .Yellow()
    .withAccount(keyring)
    .calculateGas(null, 5);
  
  console.log('Begin sign');
  const { msgId: msgId2, blockHash: blockHash2, response: response2 } = await transaction.signAndSend();
  console.log('end sign');

  console.log(`AddSlotPart msg included in block ${blockHash2}. Message id: ${msgId2}`);

  try {
    console.log('Begin response');
    const result = await response2();
    console.log('AddSlotPart executed successfully. Response:', result);
  } catch (error) {
    console.error(error);
  }

  res.send('Transaction 2 finished!');
});



app.get('/third', async (req, res) => {
  const apiOptions: GearApiOptions = {
    providerAddress: "wss://testnet.vara.network",
  };  
  const api = await GearApi.create(apiOptions);
  const keyring = await GearKeyring.fromSeed(seed, accountName);
  const sails = await Sails.new();

  sails.setApi(api);
  sails.parseIdl(idl_content);
  sails.setProgramId("0xab95283752219e28fe62e637533d49e3a282f3c2943a05415f227811ebe4420c");

  console.log('\nDOING A TRANSACTION:');
  const transaction = await sails
    .services
    .TrafficLight
    .functions
    .Red()
    .withAccount(keyring)
    .calculateGas(null, 5);
  
  console.log('Begin sign');
  const { msgId: msgId2, blockHash: blockHash2, response: response2 } = await transaction.signAndSend();
  console.log('end sign');

  console.log(`AddSlotPart msg included in block ${blockHash2}. Message id: ${msgId2}`);

  try {
    console.log('Begin response');
    const result = await response2();
    console.log('AddSlotPart executed successfully. Response:', result);
  } catch (error) {
    console.error(error);
  }

  res.send('Transaction 3 finished!');
});

app.get('/state', async (req, res) => {
  const apiOptions: GearApiOptions = {
    providerAddress: "wss://testnet.vara.network",
  };  
  const api = await GearApi.create(apiOptions);
  const sails = await Sails.new();

  sails.setApi(api);
  sails.parseIdl(idl_content);
  sails.setProgramId("0xab95283752219e28fe62e637533d49e3a282f3c2943a05415f227811ebe4420c");

  console.log('\nDOING A QUERY');     
  const testQuery = await sails
    .services
    .TrafficLight
    .queries
    .TrafficLightState("kGkLEU3e3XXkJp2WK4eNpVmSab5xUNL9QtmLPh8QfCL2EgotW");
  console.log('SE NOS RETORNO ESTOOOO:');
  console.log(testQuery);

  res.send('Transaction 4 state finished!');
});




app.get('/', async (req, res) => {
    const apiOptions: GearApiOptions = {
        providerAddress: "wss://testnet.vara.network",
    };  

    const api = await GearApi.create(apiOptions);
    const sails = await Sails.new();
    const keyring = await GearKeyring.fromSeed(seed, accountName);

    sails.setApi(api);
    sails.parseIdl(idl_content);
    sails.setProgramId("0xab95283752219e28fe62e637533d49e3a282f3c2943a05415f227811ebe4420c");

    console.log('CONSTRUCTORS');
    console.log(sails.ctors);

    console.log('SERVICES');
    console.log(sails.services);
    
    res.send('Hello Sails!');
});


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});