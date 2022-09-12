import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  RoleGranted as RoleGrantedEvent,
  Transfer as TransferEvent,
} from "../generated/Contract/Contract"

import { Role, Transfer } from "../generated/schema";

//import { log, ipfs, json, JSONValue } from "@graphprotocol/graph-ts";
const ipfsHash = "Qmbs8JSa5hFxoktUcqzeVBqLsaKiSfDcdh3FMpi3NMgj5c";


export function handleRoleGranted(event: RoleGrantedEvent): void {
  let id = event.transaction.hash.toHexString() // or however the ID is constructed
    let role = Role.load(id)
    if (role == null) {
      role = new Role(id)
    }

    role.hash = event.params.role
    role.to = event.params.sender
    role.save()

}


export function handleTransfer(event: TransferEvent): void {
    // Create a Transfer entity, using the transaction hash as the entity ID

    let id = event.transaction.hash.toHexString() // or however the ID is constructed
    let transfer = Transfer.load(id)
    if (transfer == null) {
      transfer = new Transfer(id)
    }
    // Set properties on the entity, using the event parameters
    transfer.from = event.params.from
    transfer.to = event.params.to
    transfer.tokenID = event.params.tokenId
    let transferContract = Contract.bind(event.address);
    
    transfer.externalURI = transferContract.tokenURI(event.params.tokenId);
    if ( transfer.externalURI) {
    let uri = "/" + event.params.tokenId.toString() + ".svg";

    // Save  entity to thethe store
    transfer.image = 'ipfs.io/ipfs/' + ipfsHash + uri
    }
    // if (metadata) {
    //   const value = json.fromBytes(metadata).toObject();
    //   if (value){
    //     const name = value.get("name");
    //     if (name) {
    //       transfer.name = name.toString();
    //     }
    //     const image = value.get("image");
    //     if (image) {
    //       transfer.image = image.toString();
    //     }
    //   }
    //   let attributes: JSONValue[];
    //   let clubAttributes = value.get("attributes");
    //   if (clubAttributes) {
    //     attributes = clubAttributes.toArray();

    //     for (let i = 0; i < attributes.length; i++) {
    //       let item = attributes[i].toObject();
    //       let trait: string;
    //       let traitName = item.get("trait_type");
    //       if (traitName) {
    //         trait = traitName.toString();
    //         let value: string;
    //         let traitValue = item.get("value");
    //         if (traitValue) {
    //           value = traitValue.toString();
    //           if (trait == "League") {
    //             transfer.league = value;
    //           }
    //           if (trait == "Division") {
    //             transfer.division = value;
    //           }

    //         }
    //       }
    //     }
    //   }
    //}
          

    transfer.save()
}


