/**
 * MIT License
 *
 * Copyright (C) 2025 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, {PropsWithChildren} from 'react';
import {
  Animated,
  ImageBackground,
  ImageStyle,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import {NestedScrollViewHeader} from '@react-native-oh-tpl/react-native-nested-scroll';

const NestedScrollViewHeaderAnimated = Animated.createAnimatedComponent(NestedScrollViewHeader);
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

export type ParallaxHeaderProps = {
  imageHeight: number;
  topBarHeight: number;
  onScroll?: (event: any) => void;
  translateYUp: Animated.AnimatedInterpolation<number> | 0;
  translateYDown: Animated.AnimatedInterpolation<number> | 0;
  scale: Animated.AnimatedInterpolation<number> | 1;
  imageStyle?: StyleProp<ImageStyle>;
  imageSource: any;
};

export function ParallaxHeader(props: PropsWithChildren<ParallaxHeaderProps>) {
  const {
    imageHeight,
    topBarHeight,
    translateYUp,
    translateYDown,
    scale,
    imageStyle,
    imageSource,
    onScroll,
    children,
  } = props;

  const width = useWindowDimensions().width;

  return (
    <NestedScrollViewHeaderAnimated stickyHeight={topBarHeight} onScroll={onScroll}>
 
       
        <AnimatedImageBackground
          source={imageSource}
           resizeMode="cover"
          style={[styles.imgContainer2,
            {height: imageHeight, width: width * 1.2, justifyContent: 'center'},
            {
              transform: [{scale: scale}, {translateY: translateYUp}, {translateY: translateYDown}],
            },
          ]}>
              {children}
          
        </AnimatedImageBackground>
    </NestedScrollViewHeaderAnimated>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    alignItems: 'center',
    // overflow: 'hidden',
  },
  imgContainer2: {
    alignItems: 'center',
    // overflow: 'hidden',
    zIndex: 0,
  },
 
});

export default ParallaxHeader;