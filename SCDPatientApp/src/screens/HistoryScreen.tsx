import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import {
  Image,
  Spinner,
  HStack,
  VStack,
  Spacer,
  Box,
  Button,
} from "native-base";
import {
  query,
  collection,
  getDocs,
  orderBy,
  Query,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { Entypo } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";

import { db } from "../firebase";
import Colors from "../constants/Colors";
import { RootTabScreenProps } from "../models/navigation";
import { TDiaryEntry } from "../models/DiaryEntry";
import { TPainEntry } from "../models/PainEntry";
import { AuthContext } from "../contexts/AuthContext";

import levelItems from "../constants/PainLevel";
import painStyles from "../styles/PainEpisodeFormScreen.styles";

const isToday = (someDate: Date): boolean => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

const isYesterday = (someDate: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    someDate.getDate() == yesterday.getDate() &&
    someDate.getMonth() == yesterday.getMonth() &&
    someDate.getFullYear() == yesterday.getFullYear()
  );
};

const formatDate = (date: Date): string => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return `${weekdays[date.getDay()]}, ${date.getDate()} ${
      monthNames[date.getMonth()]
    }`;
  }
};

const formatTime = (date: Date): string => {
  const hours: string = `${date.getHours() % 12}`;
  const minutes: string = `${
    date.getMinutes() < 10 ? "0" : ""
  }${date.getMinutes()}`;
  const phase: string = date.getHours() > 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${phase}`;
};

interface IEntryViewProps {
  entry: TDiaryEntry | TPainEntry;
}

const EntryView: React.FC<IEntryViewProps> = ({ entry }) => {
  const isPainEntry: boolean = !!(entry as TPainEntry).pain_intensity;

  return (
    <TouchableOpacity>
      <Box
        rounded="lg"
        style={[
          painStyles.card,
          styles.entryContainer,
          {
            marginTop: 16,
          },
        ]}
      >
      <HStack alignItems="center">
        <VStack space={3}>
          <Text style={styles.entryDateText}>
            {formatDate((entry.created_at as Timestamp).toDate())} -{" "}
            {isPainEntry ? "Pain Episode" : "Daily Diary"}
          </Text>
          <Text style={styles.entryDateText}>
            {formatTime((entry.created_at as Timestamp).toDate())}
          </Text>
        </VStack>
        <Spacer />
        {isPainEntry && (
          <View
            style={[
              {
                // TODO: change to hashmap access
                backgroundColor:
                  levelItems[10 - (entry as TPainEntry).pain_intensity].color,
              },
              styles.entryCircle,
            ]}
          >
            <Text style={styles.entryCircleNumber}>
              {(entry as TPainEntry).pain_intensity}
            </Text>
          </View>
        )}
        <Entypo name="chevron-small-right" size={24} color="black" />
      </HStack>
    </Box>
    </TouchableOpacity>
  );
};

async function queryToData<Type>(query: Query): Promise<Type[]> {
  const querySnap = await getDocs(query);
  const docs: Type[] = querySnap.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) => {
      // @ts-ignore
      return { id: doc.id, ...doc.data() } as Type;
    }
  );
  return docs;
}

function merge(diaries: TDiaryEntry[], episodes: TPainEntry[]) {
  let merged = [];
  let i = 0;
  let j = 0;

  for (let k = 0; k < diaries.length + episodes.length; k++) {
    const isDiariesDepleted = i >= diaries.length;
    const isEpisodesDepleted = j >= episodes.length;

    if (
      !isDiariesDepleted &&
      (isEpisodesDepleted || diaries[i].created_at > episodes[j].created_at)
    ) {
      merged[k] = diaries[i];
      i++;
    } else {
      merged[k] = episodes[j];
      j++;
    }
  }

  return merged;
}

const HistoryScreen: React.FC<RootTabScreenProps<"HistoryScreen">> = observer(
  ({ navigation }) => {
    const authStore = useContext(AuthContext);

    const [history, setHistory] = useState<
      (TDiaryEntry | TPainEntry)[] | null | undefined
    >(null);

    const loadHistory = async (): Promise<void> => {
      console.log("loading");
      try {
        const patientId = authStore.getPatient()!.uid!;

        // TODO: dangerous call - pulls all diaries entries
        const diariesQuery = query(
          collection(db, "patients", patientId, "diaries"),
          orderBy("created_at", "desc")
        );
        const episodesQuery = query(
          collection(db, "patients", patientId, "pain_entries"),
          orderBy("created_at", "desc")
        );

        const diaries: TDiaryEntry[] = await queryToData(diariesQuery);
        const episodes: TPainEntry[] = await queryToData(episodesQuery);

        setHistory(merge(diaries, episodes));
        authStore.setStale(false);
      } catch (error) {
        console.log(error);
        setHistory(undefined);
      }
    };

    useEffect(() => {
      loadHistory();
    }, [authStore.stale]);

    return (
      <View style={painStyles.container}>
        <HStack style={styles.header}>
          <Text style={painStyles.title}>Record History</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </HStack>
        {history === null && (
          <Spinner
            style={{ flex: 1, marginBottom: 150 }}
            size="lg"
            color={Colors.primary}
          />
        )}
        {(history === undefined || (history && history?.length === 0)) && (
          <View style={styles.container}>
            <Image
              alt="doctor using computer"
              source={require("../../assets/images/male-lifesaver-using-computer.png")}
              style={styles.image}
            />
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: 20,
                lineHeight: 26,
                letterSpacing: -0.5,
                color: "#432C81",
              }}
            >
              {history === undefined
                ? "We can't load any records at this time."
                : "You don't have any records."}
            </Text>
          </View>
        )}
        {history && history?.length > 0 && (
          <View style={[{ flex: 1 }, painStyles.form]}>
            <FlatList
              data={history}
              keyExtractor={(entry: TDiaryEntry) => entry.id!}
              renderItem={({ item }: ListRenderItemInfo<TDiaryEntry>) => (
                <EntryView entry={item} />
              )}
              contentContainerStyle={{
                paddingBottom: 125,
              }}
            />
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
    height: undefined,
    aspectRatio: 1,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 15,
  },
  shareButton: {
    backgroundColor: "#545D69",
    borderRadius: 6,
    marginRight: 14,
    paddingRight: 12,
    paddingLeft: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
  shareText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 20,
    color: "#FFFFFF",
  },
  entryContainer: {
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.16,
    borderRadius: 12,
    padding: 16,
  },
  entryDateText: {
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: -0.5,
    color: "#000000",
  },
  entryTimeText: {
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    color: "#1D335A",
  },
  entryCircle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  entryCircleNumber: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#FFFFFF",
  },
});

export default HistoryScreen;
