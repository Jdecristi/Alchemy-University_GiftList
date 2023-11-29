const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";
const merkleTree = new MerkleTree(niceList);

async function handleSuccess() {
  console.log("Trying with correct Name");

  const name = "Norman Block";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, { name, proof });

  console.log({ gift });
}

async function handleFail() {
  console.log("Trying with incorrect Name");

  const name = "Norman Bloc";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, { name, proof });

  console.log({ gift });
}

async function main() {
  await handleSuccess();
  console.log("\n");
  await handleFail();
}

main();
