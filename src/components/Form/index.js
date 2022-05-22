import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Vibration, Keyboard, Pressable } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(){

const [height, setHeight] = useState(null)
const [weight, setWeight] = useState(null)
const [messageImc, setMessageImc] = useState("Preencha com altura e peso")
const [imc, setImc] = useState(null)
const [textButton, setTextButton] = useState("Calcular")
const [errorMessage, setErrorMessage] = useState(null)

function imcCalculator(){
    let heighrFormat = height.replace(",",".")
    return setImc((weight/(heighrFormat*heighrFormat)).toFixed(2))
}

function verificationImc(){
    if (imc == null){
        Vibration.vibrate();
        setErrorMessage("Campo Obrigátorio*")
    }
}

function validationImc(){
    if (weight != null && height != null){
        imcCalculator()
        setHeight(null)
        setWeight(null)
        setMessageImc("Seu IMC é igual:")
        setTextButton("Calcular Novamente")
        setErrorMessage(null)
    }
    else{
    verificationImc()
    setImc(null)
    setTextButton("Calcular")
    setMessageImc("Preencha com altura e peso")
    }
}

    return(
        <View style={styles.formContext}>
            {imc == null ?
            <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                
                <TextInput style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex. 1.80"
                    keyboardType="numeric"
                />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>

                <TextInput style={styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex. 83.05"
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.buttonCalculator} onPress={() => validationImc()}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </Pressable>
            :
            <View style={styles.exibitionResultImc}>
                <ResultImc messageResultImc={messageImc} resultImc={imc} />
                <TouchableOpacity style={styles.buttonCalculator} onPress={() => validationImc()}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    );
}