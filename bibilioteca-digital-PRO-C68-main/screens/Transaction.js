import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      domState: "normal",
      hasCameraPermission: null,
      scanned: false,
      scannedData: ""
    }
  }
  render() {
    const{domState, hasCameraPermission, scanned, scannedData} = this.state;
    if(domState === "scanner"){
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}> 
        (hasCameraPermission ? scannedData:"") ¿Deseas otorgar acceso a la camara a esta aplicación?</Text>
        <TouchableOpacity>
          <Text> Escanear código QR </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

getCameraPermissions = async domState => {
  const{status} = await Permissions.askAsync(Permissions.CAMERA);
  this.seState({
    hasCameraPermissions: status === "granted",
    domState: domState,
    scanned: false
  })
}

handleBarcodeScanner = async ({type,data}) => {
  this.setState({
    scannedData: data,
    domState: "normal",
    scanned: true,
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  }
});
