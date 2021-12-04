import React, { useEffect, useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import { DrawerLayout } from "react-native-gesture-handler";
import { FAB } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../shared-types";
import ArticleBody from "../components/ArticleBody";
import useArcticleDom from "../hooks/useArticleDom";

type ArticleScreenProps = StackScreenProps<RootStackParamList, "Article">;

function useSetTitleEffect({ route, navigation }: ArticleScreenProps) {
  useEffect(
    function setTitle() {
      navigation.setOptions({ title: route.params.title });
    },
    [route.params.title, navigation]
  );
}

function useDrawer() {
  const drawerRef = useRef<DrawerLayout>(null);
  const openDrawer = useCallback(() => {
    drawerRef.current?.openDrawer();
  }, []);
  const closeDrawer = useCallback(() => {
    drawerRef.current?.closeDrawer();
  }, []);
  return {
    drawerRef,
    openDrawer,
    closeDrawer
  };
}

export default function ArticleScreen(props: ArticleScreenProps) {
  useSetTitleEffect(props);
  const { dom } = useArcticleDom(props.route.params.url);
  const { drawerRef, openDrawer } = useDrawer();
  const renderToc = useCallback(function renderSceneContent() {
    return null;
  }, []);
  return (
    <DrawerLayout
      drawerPosition="right"
      drawerWidth={300}
      renderNavigationView={renderToc}
      ref={drawerRef}
    >
      <ArticleBody dom={dom} />
      <FAB
        style={styles.fab}
        color="#61dafb"
        icon="format-list-bulleted-square"
        onPress={openDrawer}
      />
    </DrawerLayout>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "white"
  }
});
