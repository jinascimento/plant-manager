import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SvgFromUri } from "react-native-svg";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { isBefore, format } from "date-fns";
import { useRoute, useNavigation } from "@react-navigation/core";
import waterdrop from "../assets/waterdrop.png";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import { getBottomSpace } from "react-native-iphone-x-helper";
import fonts from "../styles/fonts";
import { PlantProps, savePlant } from "../libs/storage";

interface Params {
  plant: PlantProps;
}

export function NewPlant() {
  const route = useRoute();
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == "ios");

  const { plant } = route.params as Params;
  const navigation = useNavigation();

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subtitle:
          "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.",
        buttonTitle: "Muito Obrihado :D",
        nextScreen: "MyPlants",
      });
    } catch {
      Alert.alert("Não foi possível salvar. 🥲");
    }
  }

  function handleChangeTime(_: EventSource, dateTime: Date | undefined) {
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Escolha uma hora no futuro! ");
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker((oldState) => !oldState);
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} height={150} width={150} />
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantAbout}>{plant.about}</Text>
        </View>

        <View style={styles.controllers}>
          <View style={styles.tipContainer}>
            <Image source={waterdrop} style={styles.tipImage} />
            <Text style={styles.tipText}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Ecolha o melhor horário para ser lembrado:
          </Text>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          )}

          {Platform.OS === "android" && (
            <TouchableOpacity
              onPress={handleOpenDateTimePickerForAndroid}
              style={styles.dateTimePickerButton}
            >
              <Text style={styles.dateTimePickerText}>{`Mudar ${format(
                selectedDateTime,
                "HH:mm"
              )}`}</Text>
            </TouchableOpacity>
          )}
          <Button title="Cadastrar planta" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: colors.shape,
    paddingTop: 30,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  controllers: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: "relative",
    bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: "justify",
  },
  alertLabel: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dateTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});
