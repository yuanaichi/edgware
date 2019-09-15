import styles from './index.less';

import React, {PureComponent} from 'react';
import {balances} from '../utils/genesis.json';
import {formatNum} from '../utils/util';

import {
  NavBar,
  Icon,
  WhiteSpace,
  WingBlank,
  SearchBar,
  Button,
  Badge,
} from 'antd-mobile';
// import {decodeAddress} from '@polkadot/keyring/address';
// import {u8aToHex} from '@polkadot/util';
// import { connect } from 'dva';

// function getPub(address) {
  // return u8aToHex(decodeAddress(address));
// }

let storage;
if (window.localStorage) {
  storage = window.localStorage;
}

class Index extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      publickKey: "",
      balance: 0,
      totalAddresses: 0,
      totalAmount: 0,
    };
  }
  componentDidMount() {
    let totalAmount = 0, totalAddresses = 0;
    balances.map((b) => {
      totalAmount += (b[1] / Math.pow(10, 18));
      totalAddresses++;
    })

    this.setState({
      totalAmount,
      totalAddresses
    })
  }

  componentWillUnmount() {
  }

  checkBalance = () => {
    let balance = 0;
    let publicKey = this.state.publicKey;


    balances.map((b) => {
      if (b[0] === publicKey) {
        balance = b[1];
        return false;
      }
    })

    this.setState({
      balance
    })
  }
  render() {

    return (
      <div className="page">
        <NavBar
          mode="light"
        >Check Edgware Balance</NavBar>
        <WingBlank>
          <p style={{color: "#666"}}>
            Edgware was launched on September 15, 2019 UTC.
            <br/><br/>
            Enter your public key in the input box below to check the genesis balance.
          </p>
          <p>
            Initial total amount:
            <Badge
              text=<b>{formatNum(this.state.totalAmount, 0)}</b>
              style={{backgroundColor: 'orange'}}
            /> EDG
          </p>
          <p>
            Initial total addresses:
            <Badge
              text=<b>{formatNum(this.state.totalAddresses)}</b>
              style={{backgroundColor: 'orange'}}
            />
          </p>
          <SearchBar
            value={this.state.publicKey}
            onChange={(value) => {
              if (value.startsWith("0x")) {
                value = value.substr(2, value.length);
              }

              this.setState({
                publicKey: value
              });
            }}
            onSubmit={this.checkBalance}
            onCancel={() => {this.setState({publicKey: "", balance: 0})}}
            placeholder="Input your EDG public key"
            cancelText="Cancel"
          />
          <WhiteSpace size="sm" />
          <div style={{textAlign: "center"}}>
            <Button  type="primary" inline size="small" onClick={this.checkBalance}>Check</Button>
          </div>
          <WhiteSpace size="sm" />
          {this.state.balance > 0 ?
          <div>
            Public key:
            <Badge
              text={"0x" + this.state.publicKey.substring(0, 10) + "..." + this.state.publicKey.substr(-5)}
              style={{backgroundColor: '#21b68a'}}
            />
            <br/> <br/>
            Balance:   <Badge text={(this.state.balance / Math.pow(10, 18)).toFixed(18)}/> EDG
          </div>
          : null
        }
        </WingBlank>
      </div>
    );
  }
}

export default Index;
