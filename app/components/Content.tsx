import { StyleSheet, Image, View } from "react-native";

export enum ContentStyle {
  hero = 'hero',
  left = 'left',
  right = 'right'
}

export interface ContentProps {
  type: ContentStyle,
}

const images: any = {
  [ContentStyle.hero]: require('../../assets/content_hero.png'),
  [ContentStyle.left]: require('../../assets/content_left.png'),
  [ContentStyle.right]: require('../../assets/content_right.png'),
}

const Content = (props: ContentProps) => {
    return (
        <Image
          source={images[props.type]}
          style={[styles.icon, styles[props.type]]}
        />
    )
}

const styles: any = StyleSheet.create({
  icon: {
    resizeMode: "contain",
    // flex: 1,
    width: "100%",
  },
  hero: {
    height: 180,
  },
  left: {
    height: 130,
  },
  right: {
    height: 130,
  }
})

export default Content;