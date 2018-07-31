import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import axios from 'axios';
import { react } from "@nosplatform/api-functions";

const { injectNOS, nosProps } = react.default;

const styles = {
  button: {
    margin: "16px",
    fontSize: "14px"
  }
};

class NOSActions extends React.Component {

  // handleGetAddress = async () => alert(await this.props.nos.getAddress());

  getInitialState = () => ({ input: "" });
  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  handleClick = () => {
    console.log(this.state.input);
    axios.get(`http://api.thingspeak.com/channels/480598/feed/last.json`).then(res => {
      let sensorVal = res.data.field1;
      console.log(res.data.field1);
      if (sensorVal > 75) {
        alert(`Sensor active, current value = ${sensorVal}`);
      }
    });
  };

  render() {
    const { classes, nos } = this.props;

    const NEO = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    const gas = "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
    // const rpx = "ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9";
    const sen = "0xdd8c6e90fb57f50a5d5f1818c0af275768456032";
    const address = nos.getAddress();

    // Add your smart contract's scriptHash here
    const scriptHash = "65bc18944450249f6658acc0a7ab81f5769ae6fe";

    // The operation of your smart contract you want to (test)invoke
    const operation = "add";

    // The necessary arguments for you (test)invoke
    const args = ["AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y", "10"];

    // The storagekey you want to query
    const key = "post.latest";

    // The amount and recipient of your send function
    const recipient = "AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y";
    const amount = "50";

    const invoke = { scriptHash, operation, args }; // and testInvoke
    const getStorage = { scriptHash, key };
    const send = { gas, amount, recipient };

    return (
      <React.Fragment>
        <input className="text" onChange={ this.handleChange } />
        <button className={classes.button}>Enter sensor address</button>
        {/* <button
          className={classes.button}
          onClick={() => {
            this.handleAlert(
              nos
                .getBalance({
                  asset: NEO
                })
                .then(balance => alert(`Balance: ${balance}`))
                .catch(err => alert(`Error: ${err.message}`))
            );
            console.log(`${NEO}`);
          }}
        >
          Get NEO Balance
        </button> */}
        {/* <button
          className={classes.button}
          onClick={() =>
            this.handleAlert(
              nos.getBalance({
                asset: gas
              })
            )
          }
        >
          Get GAS Balance
        </button> */}
        <br />
        <button
          className={classes.button}
          onClick={() =>
            this.handleAlert(nos.getBalance({ asset: sen, address: nos.getAddress() }))
          }
        >
          Get SEN Balance
        </button>
        {/* <button className={classes.button} onClick={this.handleClaimGas}>
          Claim Gas
        </button>
        <button
          className={classes.button}
          onClick={() =>
            this.handleAlert(
              nos
                .send(send)
                .then(txId => alert(`${amount} ${gas} sent: ${txId} `))
                .catch(err => alert(`Error: ${err.message}`))
            )
          }
        >
          Send GAS to...
        </button>

        <button className={classes.button} onClick={() => this.handleAlert(nos.testInvoke(invoke))}>
          TestInvoke
        </button>
        {
          <button className={classes.button} onClick={() => this.handleAlert(nos.invoke(invoke))}>
            Invoke
          </button>
        }
        <button
          className={classes.button}
          onClick={() => this.handleAlert(nos.getStorage(getStorage))}
        >
          GetStorage
      </button> */}
        <button className={classes.button} onClick={this.handleClick}>
          Get values
        </button>
        <button className={classes.button} onClick={() => this.handleAlert(address)}>
          Get Wallet Address
        </button>
      </React.Fragment>
    );
  }
}

NOSActions.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  nos: nosProps.isRequired
};

export default injectNOS(injectSheet(styles)(NOSActions));
